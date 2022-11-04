var express = require('express');
var router = express.Router();
require('express-async-errors');
const query = require('../utils/mySql');

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

router.get('/getNewsClass', async function (req, res, next) {
  const classNames = await query('select * from classnews');
  res.json({
    flag: true,
    data: classNames
  })
});

module.exports = router;
