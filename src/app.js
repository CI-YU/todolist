const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const { userRequest, taskRequest } = require('./router/api');
const { Z_VERSION_ERROR } = require('zlib');
const API_URL = process.env.API_URL;

// const userRouter = require('./router/user');
// const taskRouter = require('./router/task');

const app = express();

//express path
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index',
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'login',
  });
});

app.post('/login', async (req, res) => {
  try {
    const result = await userRequest.post('/login', {
      email: req.body.account,
      password: req.body.password,
    });
    res.cookie('token', result.data.token, { httpOnly: true });
    res.send('sucess');
  } catch (err) {
    res.send('error');
  }
});

app.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'signin',
  });
});
app.get('/todo', (req, res) => {
  res.render('todo', {
    title: 'todo',
  });
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await taskRequest.get('', {
      headers: {
        Authorization: 'Bearer ' + req.cookies.token,
      },
    });
    result.data.forEach((i) => {
      delete i.owner;
      delete i.__v;
      delete i.createdAt;
    });
    res.send(result.data);
  } catch (err) {
    res.send('error');
  }
});
// app.use('/users', userRouter);
// app.use('/tasks', taskRouter);

module.exports = app;
