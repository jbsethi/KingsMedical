const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive } = require('../controllers/role/role.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['Roles'], Actions['GetAll']), GetAll)                        // GET ALL Notice
.post(AuthenticatePermission(Resources['Roles'], Actions['Create']), HandleNullString, Create)                       // CREATE Notice

router.route('/:id')
.get(AuthenticatePermission(Resources['Roles'], Actions['GetSingle']), Get)                           // GET Notice AGAINST ID
.put(AuthenticatePermission(Resources['Roles'], Actions['Update']), HandleNullString, Update)                        // UPDATE Notice
.delete(AuthenticatePermission(Resources['Roles'], Actions['Delete']), Delete)                     // DELETE Notice

router.route('/all/records')
.get(AuthenticatePermission(Resources['Roles'], Actions['GetAll']), GetEachAndEvery)       // GET Notice History

router.route('/all/active')
.get(AuthenticatePermission(Resources['Roles'], Actions['GetGetAllAll']), GetAllActive)       // GET Lab History

module.exports = router;