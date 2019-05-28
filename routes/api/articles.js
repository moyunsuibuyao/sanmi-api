const express = require('express');
const router = express.Router();
const passport = require('passport');

const Article = require('../../models/Article');

/*
* @router POST api/writeTypes/add
* @desc 新增文章
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  let ArticleItem = {
    content: '',
    creatorId: '',
    markdownContent: '',
    creator: '',
    title: '',
    description: '',
    writeType: []
  };
  Object.assign(ArticleItem, req.body)

  new Article(ArticleItem).save().then(article => {
    res.json(article);
  });
});

/*
* @router GET api/articles/list
* @desc 获取文章列表
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {}
  if (req.query.type && req.query.type.length) {
    obj = { writeType: { $in: req.query.type } }
  }
  const page = req.query.pageSize ? req.query.pageSize : 10
  const count = (req.query.pageNo - 1) * page
  Article.find(obj).populate('writeType').limit(page).skip(count).sort({'date': -1}).exec().then((article) => {
    Article.count({}, (error, total) => {
      if (!article) {
        return res.status(404).json('没有数据');
      }
      const obj = {}
      obj.dataList = article
      obj.page = {
        pageSize: parseInt(req.query.pageSize),
        pageNo: parseInt(req.query.pageNo),
        pageTotal: total
      }
      res.json(obj);
    })
  }).catch(err => res.status(404).json(err));
});

/*
* @router GET api/articles/item
* @desc 获取单个文章
* @access Private
 */
router.get('/item', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.findOne({ _id: req.query.id }).populate('writeType').then((article) => {
    if (!article) {
      return res.status(404).json('没有数据');
    }
    res.json(article);
  }).catch(err => res.status(404).json(err));
});

/*
* @router POST api/articles/edit
* @desc 编辑文章
* @access Private
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  let articleItem = {};
  Object.assign(articleItem, req.body)
  Article.findOneAndUpdate(
    {_id: req.body._id},
    {$set: articleItem},
    {new: true},
  ).then((article) => {
    res.json(article);
  }).catch(err => res.status(500).json(err))
});

/*
* @router DELETE api/projects/delete
* @desc 删除文章
* @access Private
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.findOneAndRemove({ _id: req.query.id }).then((item) => {
    if (!item) {
      return res.status(404).json('没有数据');
    }
    res.json({
      message: '删除成功'
    });
  }).catch(err => res.status(404).json(err));
});

module.exports = router;
