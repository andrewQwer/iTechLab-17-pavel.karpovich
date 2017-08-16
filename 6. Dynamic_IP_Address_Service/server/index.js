const express = require("express");

let app = express();

let users = [];

app.get("/", (req, resp) => {
	resp.send("hello from express server");
});

app.post("/register", (req, resp) => {
	users.push(req.body.user);
	res.json({
		success: true
	});
});

app.get("/getAllUsers", (req, resp) => {
	resp.send(JSON.stringify(users));
	res.json({
		users
	});
});

app.listen(3000);
