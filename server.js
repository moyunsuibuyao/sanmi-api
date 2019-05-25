const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const app = express();

// history model
app.use(history());

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const menus = require('./routes/api/menus');
const personal = require('./routes/api/personal');
const works = require('./routes/api/works');
const projects = require('./routes/api/projects');
const writeTypes = require('./routes/api/writeTypes');
const articles = require('./routes/api/articles');

const port = process.env.PORT || 5000;

// DB配置
const db = require('./config/keys').mongoURI;

//设置允许跨域访问该服务.
app.use(cors());


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
app.use('/api/projects', projects);
app.use('/api/writeTypes', writeTypes);
app.use('/api/articles', articles);

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
