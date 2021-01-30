const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, UpdateStatus, GetOrderStatus, GetOrderStatsMonthly, GetOrderStatsWeekly} = require('../controllers/order/order.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['Orders'], Actions['GetAll']),GetAll)                // GET ALL Orders
.post(AuthenticatePermission(Resources['Orders'], Actions['Create']), HandleNullString, Create)               // CREATE USER

router.route('/status')
.post(AuthenticatePermission(Resources['Orders'], Actions['GetAll']), GetOrderStatus)                // GET ALL Orders

router.route('/:id')
.get(AuthenticatePermission(Resources['Orders'], Actions['GetSingle']),Get)                   // GET USER AGAINST ID
.put(AuthenticatePermission(Resources['Orders'], Actions['Update']), HandleNullString, Update)                // UPDATE USER
.delete(AuthenticatePermission(Resources['Orders'], Actions['Delete']), Delete)             // DELETE USER

router.route('/:id/status')
.put(AuthenticatePermission(Resources['Orders'], Actions['Update']), UpdateStatus)

// Analytics
router.route('/stats/monthly')
.post(AuthenticatePermission(Resources['Orders'], Actions['GetAll']), GetOrderStatsMonthly)

router.route('/stats/weekly')
.get(AuthenticatePermission(Resources['Orders'], Actions['GetAll']), GetOrderStatsWeekly)

module.exports = router;