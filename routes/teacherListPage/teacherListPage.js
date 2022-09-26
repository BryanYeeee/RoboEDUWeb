let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/teacherListPage.html');
});

module.exports = router;
