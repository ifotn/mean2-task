var express = require('express');
var router = express.Router();

// get home
router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;
