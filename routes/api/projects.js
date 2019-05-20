const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../../models/Project');

/*
* @router POST api/projects/add
* @desc 新增项目经历
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let projectItem = {
    startTime: '',
    endTime: '',
    remark: '',
    company: '',
    userId: '',
    experienceType: ''
  };
  Object.assign(projectItem, req.body)

  new Project(projectItem).save().then(work => {
    res.json(work);
  });
});

/*
* @router GET api/projects/edit
* @desc 编辑工作经历
* @access Private
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  let projectItem = {};
  if (req.body.startTime) projectItem.startTime = req.body.startTime;
  if (req.body.endTime) projectItem.endTime = req.body.endTime;
  if (req.body.remark) projectItem.remark = req.body.remark;
  if (req.body.company) projectItem.company = req.body.company;
  if (req.body.experienceType) projectItem.experienceType = req.body.experienceType;

  Project.findOneAndUpdate(
    {_id: req.body._id},
    {$set: projectItem},
    {new: true},
  ).then((project) => {
    res.json(project);
  }).catch(err => res.status(500).json(err))
});

/*
* @router GET api/projects/list
* @desc 获取项目经历
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  Project.find(req.query).then((works) => {
    if (!works) {
      return res.status(404).json('没有数据');
    }
    res.json(works);
  }).catch(err => res.status(404).json(err));
});

/*
* @router GET api/projects/item
* @desc 获取单个项目经历
* @access Private
 */
router.get('/item', passport.authenticate('jwt', { session: false }), (req, res) => {
  Project.findOne(req.query).then((project) => {
    if (!project) {
      return res.status(404).json('没有数据');
    }
    res.json(project);
  }).catch(err => res.status(404).json(err));
});

/*
* @router DELETE api/projects/delete
* @desc 删除单个项目经历
* @access Private
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  Project.findOneAndRemove(req.query).then((project) => {
    if (!project) {
      return res.status(404).json('没有数据');
    }
    res.json(project);
  }).catch(err => res.status(404).json(err));
});

module.exports = router;
