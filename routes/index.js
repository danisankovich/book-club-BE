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
  });
});
router.post('/pitch', async function(req, res) {
  console.log(req.body);
  res.send();
});

router.get('/poll', async function(req, res) {
  res.send([
    {id: '12345', title: 'title one', authors: 'name here', thumbnail: 'http://books.google.com/books/content?id=HHJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', description: 'just a description'},
    {id: '67890', title: 'title two', authors: 'name here', thumbnail: 'http://books.google.com/books/content?id=HHJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', description: 'just a description'},
    {id: 'abcde', title: 'title three', authors: 'name here', thumbnail: 'http://books.google.com/books/content?id=HHJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', description: 'just a description'},
  ]);
});

router.post('/vote', async function(req, res) {
  console.log(req.body);
  res.send()
})

module.exports = router;
