const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const { userRequest } = require('./router/api');

// const userRouter = require('./router/user');
const taskRouter = require('./router/task');

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

app.use('/tasks', taskRouter);
// app.use('/users', userRouter);
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

app.post('/users', async (req, res) => {
  try {
    const result = await userRequest.post(
      '',
      {
        name: req.body.name,
        email: req.body.account,
        password: req.body.password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token,
        },
      }
    );
    res.send('sucess');
  } catch (err) {
    res.send('error');
  }
});

app.get('/todo', (req, res) => {
  res.render('todo', {
    title: 'todo',
  });
});
module.exports = app;
