let express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
let Article = require("./models/article");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

connectDB();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  let articles = await Article.find();
  res.render("index", {
    title: "Hello",
    articles,
  });
});

app.get("/articles/add", (req, res) => {
  res.render("addArticle", {
    title: "Add Article",
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
