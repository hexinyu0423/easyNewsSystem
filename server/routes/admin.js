var express = require('express');
var router = express.Router();

require('express-async-errors');
const query = require('../utils/mySql');
const jiami = require('../utils/sha1');
const { getToken, verifyToken } = require('../utils/token');
const $ = fn => (...args) => fn(...args).catch(args[2]);
// const { expressjwt } = require('express-jwt');

// 管理员
router.post('/reg', $(async function (req, res, next) {
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
}));

router.post('/login', $(async function (req, res, next) {
  const { uid, pwd } = req.body;
  const users = await query('select * from admins where username=? and password=?', [uid, jiami(pwd)])
  if (users.length > 0) {
    res.json({
      flag: true,
      msg: '登陆成功',
      token: getToken({ id: users[0].id }, '1h')
    })
  } else {
    res.json({
      flag: false,
      msg: '用户名或密码错误'
    })
  }
}));

router.all('*', verifyToken());

router.post('/modifyPwd', async function (req, res, next) {
  const { newPwd } = req.body;
  const { id } = req.auth;
  console.log(id, newPwd);
  await query('update admins set password=? where id=?', [jiami(newPwd), id]);
  res.json({
    flag: true,
    msg: '修改成功'
  })
});

// 新闻分类
router.post('/addNewsClass', async function (req, res, next) {
  const { className, classExplain } = req.body;
  const classNames = await query('select * from classnews where className=?', [className])
  if (classNames.length > 0) {
    res.json({
      flag: false,
      msg: '分类名称已存在'
    })
  } else {
    await query(
      'insert into classnews (className,classExplain,createdAt,updatedAt) values (?,?,now(),now())',
      [className, classExplain]
    )
    res.json({
      flag: true,
      msg: '分类新增成功'
    })
  }
});

router.post('/modifyClass', async function (req, res, next) {
  const { className, classExplain, id } = req.body;
  const classNames = await query('select * from classnews where className=? and id<>?', [className, id])
  if (classNames.length > 0) {
    res.json({
      flag: false,
      msg: '修改不成功'
    })
  } else {
    await query('update classnews set className=?,updatedAt=now(),classExplain=? where id=?', [className, classExplain, id])
    res.json({
      flag: true,
      msg: '修改成功'
    })
  }

});

router.post('/deleteClass', async function (req, res, next) {
  const { classId } = req.body;
  await query('delete from classnews where id=?', [classId]);
  res.json({
    flag: true,
    msg: '成功删除'
  })
});

// 新闻
router.post('/addNews', async function (req, res, next) {
  const { classId, title, content } = req.body;
  const authId = req.auth.id;
  await query(
    'insert into news (title,content,authId,classId,hot,createdAt,updatedAt) values (?,?,?,?,0,now(),now())',
    [title, content, authId, classId]
  );
  res.json({
    flag: true,
    msg: '添加成功'
  })
});

router.post('/modifyNews', function (req, res, next) {
  res.json({ a: 1 })
});

router.post('/deleteNews', function (req, res, next) {
  res.json({ a: 1 })
});


module.exports = router;
