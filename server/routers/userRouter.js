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
			return res.status(400).send({ message: "User already exists" });
		}

		const newUser = await new User(req.body).save();
		
		const token = await newUser.generateAuthToken();
		res.send({ user: newUser, token })
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	try {
		const currentUser = await User.findByCredentials(email, password);

		const token = await currentUser.generateAuthToken();
		res.send({ token })
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.post("/signout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token !== req.token;
		})

		await req.user.save();
		res.send({ message: "Signed out successfully" });
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.get("/me", auth, (req, res) => {
	try {
		res.send(req.user);
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
			return res.status(400).send({ message: "Invalid updates given" });
		}

		updatedFields.forEach((field) => {
			req.user[field] = updates[field];
		})
		await req.user.save();

		res.send(req.user);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.delete("/me", auth, async (req, res) => {
	try {
		await User.deleteOne({ _id: req.userId });
		res.send({ message: "Profile deleted successfully" });
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.post("/avatar", auth, upload.single("avatar"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send({ message: "No file uploaded" });
		}
		
		const avatarBuffer = req.file.buffer;
		req.user.avatar = avatarBuffer;

		await req.user.save();

		res.format({
			'image/jpeg': () => {
				res.send(avatarBuffer);
			}
		})
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.get("/avatar", auth, async (req, res) => {
	try {
		const avatarBuffer = req.user.avatar;

		res.format({
			'image/jpeg': () => {
				res.send(avatarBuffer);
			}
		})
	} catch ({ message }) {
		res.status(500).send({ message })
	}
})

userRouter.post("/bookmarks", auth, async (req, res) => {
	try {
		const { property } = req.body;
		if (req.user.bookmarked.includes(property)) {
			return res.status(400).send({ message: "Already in bookmarks" })
		}

		req.user.bookmarked = req.user.bookmarked.concat(property);

		await req.user.save();
		res.send({ message: "Bookmark added successfully" })
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.post("/recents", auth, async (req, res) => {
	try {
		const { property } = req.body;
		await req.user.updateRecents(property);
		
		res.send({ message: "Recents updated successfully" })
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.delete("/bookmarks", auth, async (req, res) => {
	try {
		const { property } = req.body;
		if (!req.user.bookmarked.includes(property)) {
			return res.status(404).send({ message: "Bookmark not found" });
		}

		req.user.bookmarked = req.user.bookmarked.filter((bookmark) => {
			return bookmark != property;
		})
		await req.user.save();

		res.send({ message: "Bookmark removed successfully" });
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.get("/bookmarks", auth, async (req, res) => {
	try {
		if (!req.user.bookmarked.length) {
			return res.status(404).send({ message: "No properties found" });
		}

		if (!req.user.populated("bookmarked")) {
			await req.user.populate("bookmarked");
		}
		res.send(req.user.bookmarked);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.get("/recents", auth, async (req, res) => {
	try {
		if (!req.user.recents.length) {
			return res.status(404).send({ message: "No properties found" });
		}

		if (!req.user.populated("recents")) {
			await req.user.populate("recents");
		}
		res.send(req.user.recents);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

userRouter.get("/selling", auth, async (req, res) => {
	try {
		if (!req.user.selling.length) {
			return res.status(404).send({ message: "No properties found" });
		}

		if (!req.user.populated("selling")) {
			await req.user.populate("selling");
		}
		res.send(req.user.selling);
	} catch ({ message }) {
		res.status(500).send({ message });
	}
})

module.exports = userRouter;