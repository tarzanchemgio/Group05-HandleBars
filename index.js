const express = require("express");
const app = express();
var path = require("path");
const hbs = require("express-handlebars");
const fs = require("fs");

const port = process.env.PORT || 3000;

const dataJs = require("./data");

/* task 4 */
var zodiacs = dataJs.zodiacs;
var emotions = dataJs.emotions;

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/stylesheets", express.static(path.join(__dirname, "./stylesheets")));

app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "task4DetailLayout",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
	})
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
	fs.readFile("index.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

app.get("/index.htm", (req, res) => {
	fs.readFile("index.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

app.get("/task2.htm", (req, res) => {
	let title = req.query["emotion"];
	let data = null;
	for (let i = 0; i < emotions.length; i++) {
		if (emotions[i].title === title) {
			data = emotions[i];
		}
	}

	if (data === null) {
		data = {
			title: "default",
			imagePath: "images/task2/default.jpg",
			quotePath: "images/task2/default.jpg",
		};
	}

	// console.log("Data: ", data);

	if (!fs.existsSync(data.quotePath)) {
		data.imagePath = "./images" + data.imagePath;
		data.quotePath = "./images" + data.quotePath;
	}

	res.render("task2", data);
});

app.get("/task4.htm", (req, res) => {
	fs.readFile("task4.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

app.get("/task4-details.htm", (req, res) => {
	let name = req.query["name"];
	let data = null;
	for (let i = 0; i < zodiacs.length; i++) {
		if (zodiacs[i].name === name) {
			data = zodiacs[i];
		}
	}

	if (!fs.existsSync(data.imagePath)) {
		data.imagePath = "./images" + data.imagePath;
	}
	// console.log(data);

	res.render("task4-details", { layout: "task4DetailLayout", zodiac: data });
});

app.listen(port, function () {
	console.log(`Server is listening on port ${port}...`);
});
