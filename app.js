let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let cors = require("cors");
let fetch = require('node-fetch')
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));


let indexRouter = require('./routes/index/index');
app.use('/', indexRouter);


let teacherListRouter = require('./routes/teacherListPage/teacherListPage');
app.use('/teacherListPage', teacherListRouter);

app.get("/123", function(req,res,next) {
  res.status(200).send("SDCFVGBNM<>ERTYUJKL:")
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("bad");
});

module.exports = app;
