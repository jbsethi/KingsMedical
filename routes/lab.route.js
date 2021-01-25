const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive,
        CreateLabServices, GetLabService, GetAllLabService, GetEachAndEveryLabService,
        GetAllActiveLabService,
        DeleteLabService,
        UpdateLabService,
        GetLabTypeServices
     } = require('../controllers/lab/lab.controller');
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


/*
**
**  Labs Service
**
*/

// router.route('/:id/services/:labServiceId')
router.route('/services/:id')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetSingle']), GetLabService)
.delete(AuthenticatePermission(Resources['Labs'], Actions['Delete']), DeleteLabService)
.put(AuthenticatePermission(Resources['Labs'], Actions['Update']), HandleNullString, UpdateLabService)

// router.route('/:id/services')
router.route('/services')
// .get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetAllLabService)
.post(AuthenticatePermission(Resources['Labs'], Actions['Create']), CreateLabServices)

router.route('/services/:id/all')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetAllLabService)

router.route('/services/:id/all/records')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetEachAndEveryLabService)

router.route('/services/:id/all/active')
.get(AuthenticatePermission(Resources['Labs'], Actions['GetAll']), GetAllActiveLabService)


router.route('/type/services')
.post(AuthenticatePermission(Resources['Labs'], Actions['Create']), GetLabTypeServices)

module.exports = router;