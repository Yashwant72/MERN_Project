const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type:String
	},
	user: {
		type: String
	},
	password: {
		type: String
	}
})

const User = mongoose.model("Users", userSchema);

module.exports = User;