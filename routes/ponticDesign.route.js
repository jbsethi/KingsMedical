const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive } = require('../controllers/ponticDesign/ponticDesign.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['PonticDesigns'], Actions['GetAll']), GetAll)                        // GET ALL Lab
.post(AuthenticatePermission(Resources['PonticDesigns'], Actions['Create']), upload.single('image'), HandleNullString, Create)                       // CREATE Lab

router.route('/:id')
.get(AuthenticatePermission(Resources['PonticDesigns'], Actions['GetSingle']), Get)                           // GET Lab AGAINST ID
.put(AuthenticatePermission(Resources['PonticDesigns'], Actions['Update']), upload.single('image'), HandleNullString, Update)                        // UPDATE Lab
.delete(AuthenticatePermission(Resources['PonticDesigns'], Actions['Delete']), Delete)                     // DELETE Lab

router.route('/all/records')
.get(AuthenticatePermission(Resources['PonticDesigns'], Actions['GetAll']), GetEachAndEvery)       // GET Lab History

router.route('/all/active')
.get(AuthenticatePermission(Resources['PonticDesigns'], Actions['GetAll']), GetAllActive)       // GET Lab All Active

module.exports = router;