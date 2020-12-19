var express = require('express');
var router = express.Router();
const https = require('https');

const Groups = require('../schema/Group');
const Meetings = require('../schema/Meeting');
const mongoose = require('mongoose');


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
    Meetings.findOne({meetingId: req.body.meetingId}, (error, meeting) => {
      if (error) {
        console.error(error);
        return res.send(error);
      }
      if (!meeting) {
        return res.send('No Meeting Found with That ID');
      }
      const userFound = meeting.pitches.find(pitch => pitch.user.toLowerCase() === req.body.user.toLowerCase());
      if (userFound) {
        Meetings.updateOne({meetingId: req.body.meetingId, 'pitches.user': req.body.user}, {'$set': {
          'pitches.$.title': req.body.title,
          'pitches.$.authors': req.body.authors,
          'pitches.$.description': req.body.description,
          'pitches.$.thumbnail': req.body.thumbnail,
          'pitches.$.votes': 0,
        }}, function (err) {
          if (err) {
            console.error(err);
            return res.send(err);
          }
          return res.send('Pitch Submitted')
        })
      } else {
        var id = mongoose.Types.ObjectId();
        meeting.pitches.push({...req.body, id});
        meeting.save(err=> {
          if (err) {
            console.error(err);
            return res.send(err);
          }
          res.send('Pitch Submitted')
        });
      }
    })
 });

router.get('/meeting', async function(req, res) {
  Meetings.findOne({meetingId: req.query.queryField}, (err, meeting) => {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    res.send(meeting);
  });
});

router.post('/vote', async function(req, res) {
  console.log(req.body);
  Meetings.findOne({meetingId: req.body.meetingId}, (err, meeting) => {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    if (!meeting) {
      return res.send('No Meeting Found');
    }
    meeting.votes[req.body.user] = req.body.votes;
    Meetings.updateOne({meetingId: req.body.meetingId}, { $set: {'votes': meeting.votes}}, (error) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      res.send('Votes Submitted')
    });
  });
});

router.get('/results', (req, res) => {
  console.log(req.query.queryField)
  Groups.findOne({groupId: req.query.queryField}, (err, group) => {
    if (err) {
      console.error(err);
      return res.send(err)
    }
    if (!group) {
      return res.send('No Groups Found');
    }
    Meetings.find({groupId: req.query.queryField}, (error, meetings) => {
      if (error) {
        console.error(error);
        return res.send(error);
      }

      res.send({group, meetings});
    });
  });
});

module.exports = router;
