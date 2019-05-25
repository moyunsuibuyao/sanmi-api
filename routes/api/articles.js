const express = require('express');
const router = express.Router();
const passport = require('passport');

const Article = require('../../models/Article');
const WriteType = require('../../models/WriteType')

/*
* @router POST api/writeTypes/add
* @desc 新增文章
* @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  WriteType.where('_id').in(req.body.writeType).exec((err, types) => {
    let ArticleItem = {
      content: '',
      creatorId: '',
      markdownContent: '',
      creator: '',
      title: '',
      description: ''
    };
    Object.assign(ArticleItem, req.body)
    ArticleItem.writeType = types,

    new Article(ArticleItem).save().then(article => {
      res.json(article);
    });
  })
});

/*
* @router GET api/articles/list
* @desc 获取文章列表
* @access Private
 */
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.find(req.query).sort({'_id': -1}).then((article) => {
    if (!article) {
      return res.status(404).json('没有数据');
    }
    res.json(article);
  }).catch(err => res.status(404).json(err));
});

/*
* @router GET api/articles/item
* @desc 获取单个文章
* @access Private
 */
router.get('/item', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.findOne({ _id: req.query.id }).then((article) => {
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
  WriteType.where('_id').in(req.body.writeType).exec((err, types) => {
    let articleItem = {};
    Object.assign(articleItem, req.body)
    articleItem.writeType = types
    Article.findOneAndUpdate(
      {_id: req.body._id},
      {$set: articleItem},
      {new: true},
    ).then((article) => {
      res.json(article);
    }).catch(err => res.status(500).json(err))
  })
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
