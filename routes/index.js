var express = require('express');
var router = express.Router();
const https = require('https');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
});

router.get('/search', async function(req, res) {
  const queryField = req.query.queryField;
  https.get(`https://www.googleapis.com/books/v1/volumes?q=${queryField}&maxResults=39&keyes&key=${process.env.key}`, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d;
    }).on('end', function() {
      const books = JSON.parse(body).items;
      res.send({books})
    });
  }).on('error', (e) => {
    console.error(e);
  })
});

module.exports = router;
