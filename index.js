const express = require("express");
const app = express();
var path = require("path");
const hbs = require("express-handlebars");
const fs = require("fs");

const port = process.env.PORT || 3000;

const dataJs = require("./data");

/* task 4 */
var zodiacs = dataJs.zodiacs;

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/stylesheets", express.static(path.join(__dirname, "./stylesheets")));

app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "layout",
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

	res.render("task4-details", data);
});

app.listen(port, function () {
	console.log(`Server is listening on port ${port}...`);
});
