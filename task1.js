const express = require("express")
const app = express()
var path = require("path")
const hbs = require("express-handlebars")
const fs = require("fs")

const port = 3000

var accounts = {
  NecessityValue: '',
  FinancialFreedomValue: '',
  GiveValue: '',
  EducationValue: '',
  LongTermValue: '',
  PlayValue: ''
}

app.use("/images", express.static("./images"))
app.use("/stylesheets", express.static(path.join(__dirname, "./stylesheets")))

app.engine
(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "task1",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/partials/",
  })
)

app.set("view engine", "hbs")

app.get("/task1.htm", (req, res) => {
  let salary = parseInt(req.query["salary"])

  if (salary === NaN){
    fs.readFile("task1.htm", (err, data) => {
      res.statusCode = 200
      res.setHeader("content-type", "text/html")
      res.send(data)
    })
  }
  else {
  accounts.NecessityValue = (salary * 55 / 100).toString()
  accounts.FinancialFreedomValue = (salary * 10 / 100).toString()
  accounts.GiveValue = (salary * 5 / 100).toString()
  accounts.LongTermValue = (salary * 10 / 100).toString()
  accounts.EducationValue = (salary * 10 / 100).toString()
  accounts.PlayValue = (salary * 10 / 100).toString()

  let data = accounts

  res.render("task1", {layout: "task1", accounts: data})
  }
})

app.listen(port, function () {
	console.log(`Server is listening on port ${port}...`)
})



