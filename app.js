var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

// App Routes
app.use('/api', require('./routes/api'))
   .use('/',    require('./routes/web'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Resource not found: ' + req.path);
  err.status = 404;
  next(err, req, res, next);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (req.path.includes("/api/")) {
    res.json({
      error: {
        message: err.message,
        status: err.status
      }
    });
  } else {
    res.render('error');
  }
});

module.exports = app;

// Start server
let port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);
