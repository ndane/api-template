var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send({ status: 'Not Found: ' + req });
});

module.exports = router;
