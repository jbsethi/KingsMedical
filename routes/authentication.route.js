const express = require('express');
const router = express.Router();
const { Login } = require('../controllers/authentication/authentication.controller');


// router.route('/')
// .get(GetAll)                        // GET ALL Notice
// .post(Create)                       // CREATE Notice

router.route('/login')
.post(Login)                           // GET Notice AGAINST ID
// .put(Update)                        // UPDATE Notice
// .delete(Delete)                     // DELETE Notice

// router.route('/all/records')
// .get(GetEachAndEvery)       // GET Notice History

module.exports = router;