const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Property = require("./property");

const secretKey = process.env.JWT_SECRET_KEY;

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	avatar: {
		type: Buffer
	}, 
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 7
	},
	phone: {
		type: Number,
		required: true,
		trim: true
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

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	if (userObject.avatar) {
		delete userObject.avatar;
	}
	
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

const User = mongoose.model("User", userSchema);

module.exports = User;