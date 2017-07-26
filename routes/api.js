let express = require('express');
let router = express.Router();

/* Index Routes */
// router.route('/')
//       .get('/', function(req, res, next) {
//         res.render('index');
//       });

/* User Routes */
let UserController = require('../controllers/UserController');
router.route('/users')
      .get(UserController.users)
      .post(UserController.create);

module.exports = router;
