const express = require('express');
const router = express.Router();
const passport = require('passport');

const WriteType = require('../../models/WriteType');

/*
* @router POST api/writeTypes/add
* @desc 新增文章类型
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let typeItem = {
    name: ''
  };
  if (req.body.name) {
    typeItem.name = req.body.name
  }
  new WriteType(typeItem).save().then(type => {
    res.json(type);
  });
});

/*
* @router POST api/writeTypes/edit
* @desc 编辑类型
* @access Private
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  let typeItem = {};
  if (req.body.name) typeItem.name = req.body.name;

  WriteType.findOneAndUpdate(
    {_id: req.body._id},
    {$set: typeItem},
    {new: true},
  ).then((project) => {
    res.json(project);
  }).catch(err => res.status(500).json(err))
});

/*
* @router GET api/writeTypes/list
* @desc 获取类型列表
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  WriteType.find(req.query).then((types) => {
    if (!types) {
      return res.status(404).json('没有数据');
    }
    res.json(types);
  }).catch(err => res.status(404).json(err));
});

module.exports = router;
