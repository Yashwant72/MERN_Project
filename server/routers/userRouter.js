const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../models/user");

const userRouter = new express.Router();

const allowedFomats = [ "jpg", "jpeg", "png" ];
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	fileFilter: (req, file, callback) => {
		const extension = file.originalname.split(".")[1].toLowerCase();

		if (allowedFomats.includes(extension)) {
			callback(null, true);
		} else {
			callback(new Error("Only JPG, JPEG and PNG files are allowed"));
		}
	}
})

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

userRouter.post("/signout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token !== req.token;
		})

		await req.user.save();
		res.status(200).json({ message: "Signed out successfully" });
	} catch ({ message }) {
		res.status(500).json({ message });
	}
})

userRouter.get("/me", auth, async (req, res) => {
	try {
		res.status(201).json(req.user);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.patch("/me", auth, async (req, res) => {
	try {
		const updates = req.body;
		const updatedFields = Object.keys(updates);
		const allowed = [ "fullName", "email", "password", "phone" ];
		
		const valid = updatedFields.every((update) => allowed.includes(update));
		if (!valid) {
			res.status(400).json({ message: "Invalid updates given" });
		}

		updatedFields.forEach((field) => {
			req.user[field] = updates[field];
		})
		await req.user.save();

		res.status(200).json(req.user);
	} catch ({ message }) {
		res.status(500).json({ message });
	}
})

userRouter.delete("/me", auth, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.userId);
		res.status(200).json({ message: "Profile deleted successfully" });
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.post("/me/avatar", auth, upload.single("avatar"), async (req, res) => {
	try {
		if (!req.file) {
			res.status(400).json({ message: "No file uploaded" });
		}
		
		const avatarBuffer = req.file.buffer;
		req.user.avatar = avatarBuffer;

		await req.user.save();

		res.setHeader('Content-Type', 'image/jpeg');
		res.setHeader('Content-Length', avatarBuffer.length);
		res.status(201).send(avatarBuffer);
	} catch ({ message }) {
		res.status(500).json({ message });
	}
})

userRouter.get("/me/avatar", auth, async (req, res) => {
	try {
		const avatarBuffer = req.user.avatar;

		res.setHeader('Content-Type', 'image/jpeg');
		res.setHeader('Content-Length', avatarBuffer.length);
		res.status(201).send(avatarBuffer);
	} catch ({ message }) {
		res.status(500).send({ message })
	}
})

module.exports = userRouter;