const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/xxxx', (req, res) => {

});

app.post('/xxxx', (req, res) => {

});

//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
