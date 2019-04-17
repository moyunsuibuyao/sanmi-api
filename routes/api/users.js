// @login && register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const Base64 = require('js-base64').Base64;
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/User');

/*
* @router POST api/users/register
* @desc 用户注册
* @access Public
 */
router.post('/register', (req, res) => {
  console.log(req.body);
  // 查询数据库是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册');
    } else {
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: Base64.decode(req.body.password),
        identity: req.body.identity
      });
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.save().then(user => {
            res.json(user);
          }).catch(err => console.log(err));
        })
      })
    }
  })
});

/*
* @router POST api/users/login
* @desc 用户登录,返回token jwt passport
* @access Public
 */
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = Base64.decode(req.body.password);
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json('用户不存在');
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        res.status(400).json('密码错误!');
      }
    })
  })
});

/*
* @router GET api/users/current
* @desc 验证通过返回用户信息
* @access Private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    identity: req.user.identity
  });
});

module.exports = router;
