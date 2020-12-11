const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete} = require('../controllers/user/user.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['Users'], Actions['GetAll']), GetAll)                // GET ALL USERS
.post(AuthenticatePermission(Resources['Users'], Actions['Create']), upload.single('image'), HandleNullString, Create)               // CREATE USER

router.route('/:id')
.get(AuthenticatePermission(Resources['Users'], Actions['GetSingle']), Get)                   // GET USER AGAINST ID
.put(AuthenticatePermission(Resources['Users'], Actions['Update']), upload.single('image'), HandleNullString, Update)                // UPDATE USER
.delete(AuthenticatePermission(Resources['Users'], Actions['Delete']), Delete)             // DELETE USER

// // GET ALL USERS
// router.get('/', (req, res)=>{
//     res.send('GET ALL USERS');
// });

// // GET USER AGAINST ID
// router.get('/:id', (req, res)=>{
//     res.send('GET USER AGAINST ID');
// });

// // CREATE USER
// router.post('/', (req, res)=>{
//     console.log(req.body);
//     res.send('CREATE USER with');
// });

// // UPDATE USER
// router.put('/:id', (req, res)=>{
//     // getAll(req, res);
//     res.send('UPDATE USER');
// });

// // DELETE USER
// router.delete('/:id', (req, res)=>{
//     // getAll(req, res);
//     res.send('DELETE USER');
// });

module.exports = router;