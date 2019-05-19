const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const menus = require('./routes/api/menus');
const personal = require('./routes/api/personal');
const works = require('./routes/api/works');

const port = process.env.PORT || 5000;

// DB配置
const db = require('./config/keys').mongoURI;

// use body-parser
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db).then(() => {
  console.log('MongoDB connect');
}).catch(err => { console.log(err) });

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// use router
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/menus', menus);
app.use('/api/personal', personal);
app.use('/api/works', works);

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
