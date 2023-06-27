const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secretKey = process.env.JWT_SECRET_KEY;

const userRouter = new express.Router();

userRouter.post("/signup", async (req, res) => {
	const { email, user, password } = req.body;

	try {
		const existing = await User.findOne({ email });
		if (existing) {
			res.status(400).json({ message: "User already exists" });
		}

		const hashedPass = await bcrypt.hash(password, 8);
		const newUser = await User.create({ email, user, password: hashedPass });
		
		const token = jwt.sign({ email: newUser.email, id: newUser._id }, secretKey);
		res.status(200).json({ user: newUser, token })
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
})

module.exports = userRouter;