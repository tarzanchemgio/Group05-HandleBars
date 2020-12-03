const express = require("express");
const app = express();
var path = require("path");
const hbs = require("express-handlebars");
const fs = require("fs");

const port = 3000;

var emotions = require("./data").emotions;

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/stylesheets", express.static(path.join(__dirname, "./stylesheets")));

app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "layout_2",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
	})
);

app.set("view engine", "hbs");

app.get("/task2.htm", (req, res) => {
	fs.readFile("task2.htm", (err, data) => {
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

		if (data === null) {
			data = {
				title: "default",
				imagePath: "images/task2/default.jpg",
				quotePath: "images/task2/default.jpg",
			};
		}

		console.log("Data: ", data);

		if (!fs.existsSync(data.imagePath)) {
			data.imagePath = "./images" + data.imagePath;
		}
	}
});

app.listen(port, function () {
	console.log(`Server is listening on port ${port}...`);
});
