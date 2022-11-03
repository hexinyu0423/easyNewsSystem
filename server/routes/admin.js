var express = require('express');
var router = express.Router();

// 管理员
router.post('/reg', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/login', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/modifyPwd', function (req, res, next) {
  res.json({ a: 1 })
});

// 新闻分类
router.post('/addNewsClass', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/modifyClass', function (req, res, next) {
  res.json({ a: 1 })
});
router.post('/deleteClass', function (req, res, next) {
  res.json({ a: 1 })
});

// 新闻
router.post('/addNews', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/modifyNews', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/deleteNews', function (req, res, next) {
  res.json({ a: 1 })
});


module.exports = router;
