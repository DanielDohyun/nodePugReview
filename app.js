let express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

const port = process.env.PORT||3000;

app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article 1',
            author: 'kim',
            body: ' this is article 1'
        },
        {
            id: 2,
            title: 'Article 2',
            author: 'lee',
            body: ' this is article 2'
        },
        {
            id: 3,
            title: 'Article 3',
            author: 'park',
            body: ' this is article 3'
        }
    ]
    res.render('index', {
        title: 'Hello',
        articles
    });
});

app.get('/articles/add', (req, res) => {
    res.render('addArticle', {
        title: 'Add Article'
    });
})

app.listen(port , () => {
    console.log(`Server running on ${port}`)
});