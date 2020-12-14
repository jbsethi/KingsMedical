const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive } = require('../controllers/lab/lab.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetAll)                        // GET ALL Lab
.post(AuthenticatePermission(Resources['Labs'], Actions['Create']), upload.single('image'), HandleNullString, Create)                       // CREATE Lab

router.route('/:id')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetSingle']), Get)                           // GET Lab AGAINST ID
.put(AuthenticatePermission(Resources['Labs'], Actions['Update']), upload.single('image'), HandleNullString, Update)                        // UPDATE Lab
.delete(AuthenticatePermission(Resources['Labs'], Actions['Delete']), Delete)                     // DELETE Lab

router.route( '/all/records')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetEachAndEvery)       // GET Lab History

router.route('/all/active')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetAllActive)       // GET Lab All Active

module.exports = router;