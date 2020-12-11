const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, UpdateStatus} = require('../controllers/order/order.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(GetAll)                // GET ALL USERS
.post( HandleNullString, Create)               // CREATE USER

router.route('/:id')
.get(Get)                   // GET USER AGAINST ID
.put( HandleNullString, Update)                // UPDATE USER
.delete( Delete)             // DELETE USER

router.route('/:id/status')
.put(UpdateStatus)

module.exports = router;