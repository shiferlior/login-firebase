var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const fireAdmin = require('firebase-admin');
const fireApp = fireAdmin.initializeApp();
const whiteListURI = ['/index', '/api/login'];

app.use(async function (req, res, next) {
  whiteListURI.includes(req.originalUrl) ? next() :
    fireApp.auth().verifyIdToken(req.header('idToken')).then(next).catch(() => {
      console.error(error); //Should use logger.info("login failed: err=" + error) here instead of console.error();
      res.status(401).json({ "error": "You have to login with 'idToken' header" });
    });
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
