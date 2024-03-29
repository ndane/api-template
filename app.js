import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import config from './config/config';

/* App Routes */
import apiRoutes from './routes/api';
import apiRoutesProtected from './routes/api-protected';
import webRoutes from './routes/web';

const app = express();

// DB set up
mongoose.Promise = global.Promise;
mongoose.connect(mongooseConfig.url, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan(config.morganParameters));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Determine Request type
app.use((req, res, next) => {
  const contentType = req.headers['content-type'];
  req.isAPIRequest = (
    contentType === 'application/json' ||
    contentType === 'application/x-www-form-urlencoded'
  );
  next();
});

// App Routes
app.use('/api', apiRoutes)
  .use('/api', apiRoutesProtected)
  .use('/', webRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Resource not found: ${req.path}`);
  err.status = 404;
  next(err, req, res, next);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (req.path.includes('/api/')) {
    res.json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    res.render('error');
  }
});

module.exports = app;
