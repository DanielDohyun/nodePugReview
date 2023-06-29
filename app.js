let express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
let Article = require("./models/article");
const bodyParser = require("body-parser");
const bodyparser = require('body-parser');

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

connectDB();

//bodyparser middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

//home
app.get("/", async (req, res) => {
  let articles = await Article.find();
  res.render("index", {
    title: "Hello",
    articles,
  });
});

//add article route
app.get("/articles/add", (req, res) => {
  res.render("addArticle", {
    title: "Add Article",
  });
});

//get single article
app.get('/article/:id', async (req, res) => {
    let article = await Article.findById(req.params.id)
    console.log(article)
    res.render("article", {
        article
      });
})

//add article submit POST route
app.post('/articles/add', (req, res) => {
    let article = new Article();

    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save().then(() => {
        res.redirect('/')
    }
    ).catch((e) => {
        console.log(e);
        return;
    })
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
