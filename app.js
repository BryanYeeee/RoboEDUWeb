let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let cors = require("cors");
let fetch = require('node-fetch')
require('dotenv').config()

console.log(process.env.AUTH_KEY)
let indexRouter = require('./routes/index/index');
let usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('/request', function (req, res, next) {
  console.log("/request", req.body);
  let api = req.body.api;
  let fetchinput = {
    method: req.body.method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if (req.body.method == 'post') {
    fetchinput.body = JSON.stringify(req.body.data);
    req.body.data.userkey = process.env.AUTH_KEY;
  }
  fetch(process.env.HOSTNAME + api, fetchinput)
    .then(res => {
      status = res.status;
      return res.json();
    }
    ).then(result => {
      if (status >= 400 && status <= 600) {
        console.log(api + " Error: " + result[0].error);
        res.status(400).json(result);
      } else {
        console.log(api, result); res.json(result);
      }
    }).catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
});

app.post('/login', function (req, res, next) {
  console.log("/login", req.body);
  let fname = req.body.firstname
  let lname = req.body.lastname
  let pswd = req.body.password
  let expiry = req.body.expiry

  if (fname == undefined || lname == undefined || pswd == undefined || expiry == undefined) {
    res.status(400).json({ 'error': 'empty fields' })
    return
  }

  fetch(`${process.env.HOSTNAME}/logins/loginpswd`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: fname,
      lastname: lname,
      password: pswd,
      expiry: - 1
    })
  })
    .then(res => {
      status = res.status;
      return res.json();
    }
    ).then(result => {
      if (status >= 400 && status <= 600) {
        console.log("Login Error: " + result[0].error);
        res.status(400).json(result);
      } else {
        process.env.AUTH_KEY = result[0]["auth-key"];
        process.env.FNAME = result[0]["fname"];
        process.env.LNAME = result[0]["lname"];
        process.env.LOCATION = result[0]["location"];
        process.env.USERID = result[0]["user id"];
        process.env.USERTYPE = result[0]["user type"];

        console.log("Login", result); res.json(result);
      }
    }).catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
});

app.get('/user', function (req, res, next) {
  console.log("/user");
  res.json({
    "auth-key": process.env.AUTH_KEY,
    fname:process.env.FNAME,  
    lname:process.env.LNAME,
    location:process.env.LOCATION,  
    "user id":process.env.USERID,  
    "user type":process.env.USERTYPE,  
  })
  
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("bad");
});

module.exports = app;
