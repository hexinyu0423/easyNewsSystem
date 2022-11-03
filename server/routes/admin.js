var express = require('express');
var router = express.Router();

const query = require('../utils/mySql');
const jiami = require('../utils/sha1');
const getToken = require('../utils/getToken');

// 管理员
router.post('/reg', async function (req, res, next) {
  try {
    const { uid, pwd } = req.body;
    const users = await query('select * from admins where username=?', [uid]);
    if (users.length > 0) {
      res.json({
        flag: false,
        msg: '用户名已存在'
      })
    } else {
      await query('insert into admins (username,password,createdAt,updatedAt) values (?,?,now(),now())', [uid, jiami(pwd)])
      res.json({
        flag: true,
        msg: '注册成功'
      })
    }
  } catch (e) {
    next(e)
  }

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
