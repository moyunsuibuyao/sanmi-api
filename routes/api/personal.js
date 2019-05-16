const express = require('express');
const router = express.Router();

const Personal = require('../../models/Personal');

/*
* @router GET api/personal/current
* @desc 获取简历信息
* @access Private
 */

router.get('/current', (req, res) => {
  Personal.find().then((personal) => {
    if (!personal) {
      return res.status(404).json('没有数据');
    }
    res.json({
      id: personal._id ? personal._id : '',
      name: personal.name ? personal.name : '',
      school: personal.school ? personal.school : '',
      email: personal.email ? personal.email : '',
      phone: personal.phone ? personal.phone : '',
      subject: personal.subject ? personal.subject : '',
      startSchoolDate: personal.startSchoolDate ? personal.startSchoolDate : '',
      graduateDate: personal.graduateDate ? personal.graduateDate : '',
      major: personal.major ? personal.major : '',
      faculty: personal.faculty ? personal.faculty : '',
      remark: personal.remark ? personal.remark : ''
    });
  }).catch(err => res.status(404).json(err));
});

module.exports = router;
