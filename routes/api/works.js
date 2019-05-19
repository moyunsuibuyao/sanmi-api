const express = require('express');
const router = express.Router();
const passport = require('passport');

const Work = require('../../models/Work');

/*
* @router POST api/works/add
* @desc 新增工作经历
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let workItem = {
    startTime: '',
    endTime: '',
    remark: '',
    company: '',
    userId: ''
  };
  Object.assign(workItem, req.body)

  new Work(workItem).save().then(work => {
    res.json(work);
  });
});

/*
* @router GET api/works/edit
* @desc 编辑工作经历
* @access Private
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  let workItem = {};
  if (req.body.startTime) workItem.startTime = req.body.startTime;
  if (req.body.endTime) workItem.endTime = req.body.endTime;
  if (req.body.remark) workItem.remark = req.body.remark;
  if (req.body.company) workItem.company = req.body.company;

  Work.findOneAndUpdate(
    {_id: req.body._id},
    {$set: workItem},
    {new: true},
  ).then((work) => {
    res.json(work);
  }).catch(err => res.status(500).json(err))
});

/*
* @router GET api/works/list
* @desc 获取工作经历
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  Work.find(req.query).then((works) => {
    if (!works) {
      return res.status(404).json('没有数据');
    }
    res.json(works);
  }).catch(err => res.status(404).json(err));
});

/*
* @router GET api/works/item
* @desc 获取单个工作经历
* @access Private
 */
router.get('/item', passport.authenticate('jwt', { session: false }), (req, res) => {
  Work.findOne(req.query).then((work) => {
    if (!work) {
      return res.status(404).json('没有数据');
    }
    res.json(work);
  }).catch(err => res.status(404).json(err));
});

/*
* @router DELETE api/works/delete
* @desc 删除单个工作经历
* @access Private
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  Work.findOneAndRemove(req.query).then((work) => {
    if (!work) {
      return res.status(404).json('没有数据');
    }
    res.json(work);
  }).catch(err => res.status(404).json(err));
});

module.exports = router;
