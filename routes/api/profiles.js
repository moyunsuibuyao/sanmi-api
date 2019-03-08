// @login && register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

/*
* @router POST api/profiles/add
* @desc 创建信息
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.crash) profileFields.crash = req.body.crash;
  if (req.body.remark) profileFields.remark = req.body.remark;

  new Profile(profileFields).save().then(profile => {
    res.json(profile);
  });
});

/*
* @router GET api/profiles/list
* @desc 获取所有列表
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.find().then((profile) => {
    if (!profile) {
      return res.status(404).json('没有数据列表');
    }
    res.json(profile);
  }).catch(err => res.status(404).json(err));
});

/*
* @router GET api/profiles/list/:id
* @desc 获取单个信息
* @access Private
 */
router.get('/list/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id }).then((profile) => {
    if (!profile) {
      return res.status(404).json('查不到该数据');
    }
    res.json(profile);
  }).catch(err => res.status(404).json(err));
});

/*
* @router POST api/profiles/edit
* @desc 编辑单个信息
* @access Private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.crash) profileFields.crash = req.body.crash;
  if (req.body.remark) profileFields.remark = req.body.remark;

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true},
  ).then((profile) => {
    res.json(profile);
  }).catch(err => res.status(500).json(err))
});

/*
* @router Delete api/profiles/delete/:id
* @desc 获取单个信息
* @access Private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ _id: req.params.id }).then((profile) => {
    profile.save().then((result) => {
      return res.json(result)
    }).catch(err => res.status(404).json(err))
  });
});

module.exports = router;
