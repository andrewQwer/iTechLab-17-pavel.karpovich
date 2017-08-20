const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json(), function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

let users = [];

let ips = [];

let bin = [];

app.get("/", (req, resp) => {
	resp.send("hello from express server");
});

app.post("/checkUserForUniq", (req, resp) => {
	let duplicationCount = users.reduce((count, item) => {
		if (users.length !== 0) {
			if (
				item.login == req.body.params.login ||
				item.email == req.body.params.email
			)
				count++;
		}
		return count;
	}, 0);
	if (duplicationCount === 0) {
		resp.json({
			success: true
		});
	} else {
		return resp.status(500).send({
			error: "This login or email already used"
		});
	}
});

app.post("/register", (req, resp) => {
	users.push(req.body.params.user);
	resp.json({
		success: true
	});
});

app.post("/login", (req, resp) => {
	const { login, pass } = req.body.params;
	let user = users.find(item => item.login === login);
	if (!!user) {
		resp.json({
			user
		});
	} else {
		return resp.status(500).send({
			error: "Incorrect login or password"
		});
	}
});

app.post("/logOut", (req, resp) => {
	resp.json({
		success: true
	});
});

app.get("/getAllUsers", (req, resp) => {
	resp.json({
		users
	});
});

app.get("/getUserInfoByLogin", (req, resp) => {
	let user = users.find(item => item.login === req.query.login);
	if (!!user) {
		resp.json({
			user
		});
	} else {
		return resp.status(500).send({
			error: "Failed to find user"
		});
	}
});

app.get("/getUserIpByLogin", (req, resp) => {
	let userUuid = users.find(item => item.login === req.query.login).uuid;
	let userIps = ips.reduce((arr, item) => {
		if (ips.length !== 0) {
			if (item.ownerId === userUuid) {
				arr.push(item);
			}
		}
		return [...arr];
	}, []);
	if (!!userIps) {
		resp.json({
			userIps
		});
	} else {
		return resp.status(500).send({
			error: "Failed to find user"
		});
	}
});

app.post("/addIp", (req, resp) => {
	ips.push(req.body.params.ip);
	resp.json({
		success: true
	});
});

app.post("/editIp", (req, resp) => {
	const { uuid, domain, ip, updateDate } = req.body.params;
	ips = ips.map(item => {
		if (item.uuid === uuid) {
			item.domain = domain;
			item.ip = ip;
			item.updateDate = updateDate;
		}
		return item;
	});
	resp.json({
		success: true
	});
});

app.post("/deleteIp", (req, resp) => {
	const { uuid } = req.body.params;
	ips = ips.filter(item => item.uuid !== uuid);
	resp.json({
		success: true
	});
});

app.post("/checkIpOnDuplicate", (req, resp) => {
	let duplicationCount = ips.reduce((count, item) => {
		if (ips.length !== 0) {
			if (item.domain == req.body.params.domain) count++;
		}
		return count;
	}, 0);
	if (duplicationCount === 0) {
		resp.json({
			success: true
		});
	} else {
		return resp.status(500).send({
			error: "This domain already used"
		});
	}
});

app.post("/getPremiumAccess", (req, resp) => {
	let uuids = req.body.params.uuids;
	users.map(item => {
		if (uuids.includes(item.uuid)) {
			item.type = item.type == "SimpleUser" ? "PremiumUser" : "SimpleUser";
		}
		return item;
	});
	resp.json({
		success: true
	});
});

app.get("/getAllUserInBin", (req, resp) => {
	resp.json({
		users: bin
	});
});

app.post("/moveToBin", (req, resp) => {
	let uuids = req.body.params.uuids;
	let binUsers = users.filter(item => uuids.includes(item.uuid));
	bin = bin.concat(binUsers);
	users = users.filter(item => !uuids.includes(item.uuid));
	resp.json({
		success: true
	});
});

app.post("/deleteUserFromBin", (req, resp) => {
	let uuids = req.body.params.uuids;
	bin = bin.filter(item => !uuids.includes(item.uuid));
	resp.json({
		success: true
	});
});

app.post("/restoreUserFromBin", (req, resp) => {
	let uuids = req.body.params.uuids;
	let restoreUsers = bin.filter(item => uuids.includes(item.uuid));
	bin = bin.filter(item => !uuids.includes(item.uuid));
	users = users.concat(restoreUsers);
	resp.json({
		success: true
	});
});

app.listen(3000);
