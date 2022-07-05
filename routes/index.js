var express = require('express');
var router = express.Router();
const connection = require("../database/conn")

/* GET home page. */
router.get('/', async function (req, res, next) {
  const request = require('request');
  let t;

  await request('https://api.ipify.org?format=json', {json: true}, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.ip);
    t = body;
  });


  res.render('index', {title: 'Express'});
});

module.exports = router;
