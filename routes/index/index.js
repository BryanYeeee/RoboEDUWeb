let express = require('express');
let router = express.Router();
// let x = require('C:/Users/halod/OneDrive/Desktop/RoboEDUWebsite/RoboEDUSite/public/test')
// LOGIN

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
  // console.log("ITS" + x)
});

module.exports = router;
