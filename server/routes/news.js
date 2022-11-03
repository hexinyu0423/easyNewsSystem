var express = require('express');
var router = express.Router();


router.get('/hot', function (req, res, next) {
  res.json({ a: 1 })
});

router.get('/getNewsList', function (req, res, next) {
  res.json({ a: 1 })
});

router.get('/getNews', function (req, res, next) {
  res.json({ a: 1 })
});

router.get('/searchNews', function (req, res, next) {
  res.json({ a: 1 })
});

router.get('/getNewsClass', function (req, res, next) {
  res.json({ a: 1 })
});

module.exports = router;
