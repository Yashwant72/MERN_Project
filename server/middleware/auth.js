const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secretKey = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").split(" ")[1];
		const decoded = jwt.verify(token, secretKey);

		const currentUser = await User.findOne({ _id: decoded.userId, email: decoded.email })
		
		req.userId = currentUser._id;
		req.user = currentUser;
		req.token = token;

		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ message: "Unauthorized user" })
	}
}

module.exports = auth;