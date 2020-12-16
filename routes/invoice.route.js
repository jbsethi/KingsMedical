const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetAllByOrder } = require('../controllers/invoice/invoice.controller');
const { HandleNullString, AuthenticatePermission } = require('../middlewares');
const { Resources, Actions } = require('../utils/permissions');

router.route('/')
.get(AuthenticatePermission(Resources['Invoices'], Actions['GetAll']), GetAll)                        // GET ALL Lab
.post(AuthenticatePermission(Resources['Invoices'], Actions['Create']), upload.single('attachment'), HandleNullString, Create)                       // CREATE Lab

router.route('/:id')
.get(AuthenticatePermission(Resources['Invoices'], Actions['GetSingle']), Get)                           // GET Lab AGAINST ID
.put(AuthenticatePermission(Resources['Invoices'], Actions['Update']), upload.single('attachment'), HandleNullString, Update)                        // UPDATE Lab
.delete(AuthenticatePermission(Resources['Invoices'], Actions['Delete']), Delete)                     // DELETE Lab

router.route('/order/:id')
.get(AuthenticatePermission(Resources['Invoices'], Actions['GetAll']), GetAllByOrder )       // GET Lab History


module.exports = router;