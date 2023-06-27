const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

const startServer = async () => {
	// console.log(process.env.MONGODB_URI);
	await mongoose.connect(process.env.MONGODB_URI);
	console.log("MongoDB connection successful");

	app.listen(port, () => {
		console.log(`Server started successfully on port ${port}`);
	})
}

startServer();