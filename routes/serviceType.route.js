const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive, GetServicesByServiceType } = require('../controllers/serviceType/serviceType.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['ServiceTypes'], Actions['GetAll']), GetAll)                        // GET ALL Notice
.post(AuthenticatePermission(Resources['ServiceTypes'], HandleNullString, Actions['Create']), Create)                       // CREATE Notice

router.route('/:id')
.get(AuthenticatePermission(Resources['ServiceTypes'], Actions['GetSingle']), Get)                           // GET Notice AGAINST ID
.put(AuthenticatePermission(Resources['ServiceTypes'], HandleNullString, Actions['Update']), Update)                        // UPDATE Notice
.delete(AuthenticatePermission(Resources['ServiceTypes'], Actions['Delete']), Delete)                     // DELETE Notice

router.route('/:id/services')
.get(AuthenticatePermission(Resources['ServiceTypes'], Actions['GetAll']), GetServicesByServiceType );         

router.route('/all/records')
.get(AuthenticatePermission(Resources['ServiceTypes'], Actions['GetAll']), GetEachAndEvery)       // GET Notice History

router.route('/all/active')
.get(AuthenticatePermission(Resources['ServiceTypes'], Actions['GetAll']), GetAllActive)       // GET Lab History

module.exports = router;