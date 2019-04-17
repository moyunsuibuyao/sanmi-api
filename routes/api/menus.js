const express = require('express');
const router = express.Router();
const passport = require('passport');

const Menu = require('../../models/Menu');

/*
* @router GET api/menus/list
* @desc 获取所有菜单
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  Menu.find().then((menu) => {
    if (!menu) {
      return res.status(404).json('没有数据列表');
    }
    res.json(menu);
  }).catch(err => res.status(404).json(err));
});

/*
* @router POST api/menus/add
* @desc 创建菜单
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const menuObj = {};
  if (req.body.isAdmin) menuObj.type = req.body.isAdmin;
  if (req.body.name) menuObj.name = req.body.name;
  if (req.body.icon) menuObj.icon = req.body.icon;
  if (req.body.level) menuObj.level = req.body.level;
  if (req.body.parentId) menuObj.parentId = req.body.parentId || '';
  if (req.body.path) menuObj.path = req.body.path;

  new Menu(menuObj).save().then(menu => {
    res.json(menu);
  });
});

module.exports = router;
