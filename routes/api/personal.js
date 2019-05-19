const express = require('express');
const router = express.Router();
const passport = require('passport');

const Personal = require('../../models/Personal');

/*
* @router GET api/personal/current
* @desc 获取简历信息
* @access Private
 */

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  Personal.findOne(req.query).then((personal) => {
    if (!personal) {
      return res.status(404).json('没有数据');
    }
    res.json(personal);
  }).catch(err => res.status(404).json(err));
});

/*
* @router POST api/personal/add
* @desc 新增简历信息
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let baseInfo = {
    name: '',
    school: '',
    email: '',
    phone: '',
    subject: '',
    startSchoolDate: '',
    graduateDate: '',
    major: '',
    faculty: '',
    remark: '',
    userId: '',
    skill: []
  };
  Object.assign(baseInfo, req.body)

  new Personal(baseInfo).save().then(info => {
    res.json(info);
  });
});

/*
* @router POST api/personal/edit
* @desc 编辑简历信息
* @access Private
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const updatePersonal = {};
  if (req.body.name) updatePersonal.name = req.body.name;
  if (req.body.email) updatePersonal.email = req.body.email;
  if (req.body.school) updatePersonal.school = req.body.school;
  if (req.body.phone) updatePersonal.phone = req.body.phone;
  if (req.body.subject) updatePersonal.subject = req.body.subject;
  if (req.body.remark) updatePersonal.remark = req.body.remark;
  if (req.body.startSchoolDate) updatePersonal.startSchoolDate = req.body.startSchoolDate;
  if (req.body.graduateDate) updatePersonal.graduateDate = req.body.graduateDate;
  if (req.body.faculty) updatePersonal.faculty = req.body.faculty;
  if (req.body.skill && req.body.skill.length) updatePersonal.skill = req.body.skill;

  Personal.findOneAndUpdate(
    {_id: req.body._id},
    {$set: updatePersonal},
    {new: true},
  ).then((personal) => {
    res.json(personal);
  }).catch(err => res.status(500).json(err))
});

module.exports = router;
