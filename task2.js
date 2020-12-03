const express = require("express");
const app = express();
var path = require("path");
const hbs = require("express-handlebars");
const fs = require("fs");

/* task 2 */
var emotions = [
  {
    title: "default",
    imagePath: "images/task2/default.jpg",
    quotePath: "images/task2/default.jpg",
  },
  {
    title: "happy",
    imagePath: "/task2/happy.jpeg",
    quotePath: "/task2/happy/happy1.jpg",
  },
  {
    title: "sad",
    imagePath: "/task2/sad.jpeg",
    quotePath: "/task2/sad/sad1.jpg",
  },
  {
    title: "stress",
    imagePath: "/task2/stress.jpeg",
    quotePath: "/task2/stress/stress1.jpg",
  },
  {
    title: "angry",
    imagePath: "/task2/angry.jpeg",
    quotePath: "/task2/angry/angry1.jpg",
  },
];

app.use("/images", express.static("./images"));
app.use(express.static(path.join(__dirname, "./stylesheets")));

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
  let name = req.query["title"];
  let data = null;
  for (let i = 0; i < emotions.length; i++) {
    if (emotions[i].title === title) {
      data = emotions[i];
    }
  }

  if (!fs.existsSync(data.imagePath)) {
    data.imagePath = "./images" + data.imagePath;
  }

  res.render("task2", data);
});

app.listen(5000, function () {
  console.log("Server is listening on port 5000...");
});
