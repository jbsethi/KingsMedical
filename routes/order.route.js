const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete} = require('../controllers/order/order.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(GetAll)                // GET ALL USERS
.post( HandleNullString, Create)               // CREATE USER

router.route('/:id')
.get(Get)                   // GET USER AGAINST ID
.put( HandleNullString, Update)                // UPDATE USER
.delete( Delete)             // DELETE USER

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