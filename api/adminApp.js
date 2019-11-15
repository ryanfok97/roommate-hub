var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var spotifyAdminRouter = require('./routes/spotify-admin-routes');

var adminApp = express();

// view engine setup
adminApp.set('views', path.join(__dirname, 'views'));
adminApp.set('view engine', 'jade');

adminApp.use(logger('dev'));
adminApp.use(express.json());
adminApp.use(express.urlencoded({ extended: false }));
adminApp.use(cookieParser());
// adminApp.use(express.static(path.join(__dirname, 'public')));

adminApp.use('/spotify', spotifyAdminRouter);

// catch 404 and forward to error handler
adminApp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
adminApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = adminApp;
