const express = require("express");

const port = process.env.PORT || 8080;
const app = express();

app.get("/api/hello", (req, res) => {
	res.send({ text: "Hello World" });
})

app.listen(port, () => {
	console.log(`Server started successfully on port ${port}`);
})