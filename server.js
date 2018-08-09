const express = require('express');
const path = require('path');
var router = express.Router();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle this request',
    });
})

app.listen(3000);