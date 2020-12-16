const express = require('express');
const router = express.Router();
const { Authenticate, DecodeToken } = require('../middlewares');

// INCLUDING ROUTES
const authentication = require('./authentication.route');
const user = require('./user.route');
const role = require('./role.route');
const lab = require('./lab.route');
const tooth = require('./tooth.route');
const service = require('./service.route');
const serviceType = require('./serviceType.route');
const ponticDesign = require('./ponticDesign.route');
const shade = require('./shade.route');
const OrderRoutes = require('./order.route');
const InvoiceRoutes = require('./invoice.route');

// router.get('/', (req, res)=>{
//     res.send('API Page');
// });


// REGESTRING ROUTES
router.use('/authentication', authentication);
router.use('/users', Authenticate, DecodeToken, user);
router.use('/roles', Authenticate, DecodeToken, role);
router.use('/labs', Authenticate, DecodeToken, lab);
router.use('/tooths', Authenticate, DecodeToken, tooth);
router.use('/services', Authenticate, DecodeToken, service);
router.use('/serviceTypes', Authenticate, DecodeToken, serviceType);
router.use('/ponticDesigns', Authenticate, DecodeToken, ponticDesign);
router.use('/invoices', Authenticate, DecodeToken, InvoiceRoutes);
router.use('/shades', Authenticate, DecodeToken, shade);
router.use('/orders', Authenticate, DecodeToken, OrderRoutes);

module.exports = router;
