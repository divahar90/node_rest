var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// index
app.use('/', index);
/*
// device
app.use('/api/device',  require('./model/device.js'));
/!*app.use('/api/device/:id', device.getDevice);
app.use('/api/device', device.createDevice);
app.use('/api/device', device.updateDevice);
app.use('/api/device/:id', device.removeDevice);*!/

// location
app.use('/api/location', require('./model/location.js'));
/!*app.use('/api/location/:id', location.getLocation());
app.use('/api/location', location.createLocation());
app.use('/api/location', location.updateLocation());
app.use('/api/location/:id', location.removeLocation());*!/*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
