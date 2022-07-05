let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let categoryRouter = require('./routes/category')
let imageRouter = require('./routes/image')
let orderRouter = require('./routes/order')
let productRouter = require('./routes/product')
const request = require("request");


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function (req, res, next) {
  const request = require('request');

  await request('https://api.ipify.org?format=json', {json: true}, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    app.locals.ip = body;
  });
  res.render('index', {title: 'Express'});
});

app.get('/myip', async function (req, res, next) {
  res.json(app.locals.ip);
});


app.use('/category', categoryRouter);
app.use('/image', imageRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
