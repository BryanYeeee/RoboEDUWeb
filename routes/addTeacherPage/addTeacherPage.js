let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/addTeacherPage.html');
});

module.exports = router;
