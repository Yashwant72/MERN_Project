const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");

const userRouter = new express.Router();

userRouter.post("/signup", async (req, res) => {
	try {
		const existing = await User.findOne({ email: req.body.email });
		if (existing) {
			res.status(400).json({ message: "User already exists" });
		}

		const newUser = await new User(req.body).save();
		
		const token = await newUser.generateAuthToken();
		res.status(201).json({ user: newUser, token })
	} catch ({ message }) {
		res.status(500).json({ message });
	}
})

userRouter.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	try {
		const currentUser = await User.findByCredentials(email, password);

		const token = await currentUser.generateAuthToken();
		res.status(201).json({ token })
	} catch ({ message }) {
		res.status(500).json({ message });
	}
})

userRouter.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token !== req.token;
		})

		await req.token.save();
		res.status(200).json({ message: "Signed out successfully" });
	} catch ({ message }) {
		res.send(500).json({ message });
	}
})

userRouter.get("/me", auth, async (req, res) => {
	try {
		res.status(201).json(req.user);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.patch("/me", async (req, res) => {

})

userRouter.delete("/me", async (req, res) => {
	try {
		await req.user.delete();
		res.status(200).json({ message });
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

module.exports = userRouter;