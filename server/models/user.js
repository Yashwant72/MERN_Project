const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const validator = require("validator");
const Property = require("./property");

const secretKey = process.env.JWT_SECRET_KEY;

const getDefaultAvatar = () => {
  const imagePath = path.join(__dirname, "../../public/assets", "userPlaceholder.png");
  const imageBuffer = fs.readFileSync(imagePath);
	
  return imageBuffer;
}

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim: true,
	},
	avatar: {
		type: Buffer,
		default: getDefaultAvatar
	}, 
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate: (value) => {
			if (!validator.isEmail(value)) {
				throw new Error("Valid email must be provided");
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 7,
		validate: (value) => {
			if (!validator.isStrongPassword(value)) {
				throw new Error("Password should be more complex");
			}
		}
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		validate: (value) => {
			if (!validator.isMobilePhone(value)) {
				throw new Error("Valid phone number must be provided");
			}
		}
	},
	birthDate: {
		type: Date,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	selling: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Property"
	}],
	bookmarked: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Property"
	}], 
	recents: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Property"
	}],
	tokens: [{
		type: String
	}]
})

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);

	user.tokens = user.tokens.concat(token);
	await user.save();

	return token;
}

userSchema.methods.updateRecents = async function (property) {
	const user = this;
	const index = user.recents.indexOf(property);
	
	if (index != -1) {
		user.recents.splice(index, 1);
	} else if (user.recents.length >= 50) {
		user.recents.shift();
	}

	user.recents = user.recents.concat(property);
	await user.save();
}

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	// if (userObject.avatar) {
	// 	delete userObject.avatar;
	// }
	
	delete userObject.__v;
	delete userObject.tokens;
	delete userObject.password;

	delete userObject.bookmarked;
	delete userObject.recents;
	delete userObject.selling;

	return userObject;
}

userSchema.statics.findByCredentials = async function (email, password) {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Could not find user");
	}

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) {
		throw new Error("Invalid credentials provided");
	}

	return user;
}

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
})

userSchema.pre("deleteOne", async function (next) {
	const userId = this.getFilter()._id;
	const deleted = await Property.deleteMany({ currentOwner: userId });

	console.log(deleted);

	next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;