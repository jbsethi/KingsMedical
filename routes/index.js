const express = require('express');
const router = express.Router();
const { Authenticate, DecodeToken } = require('../middlewares');

// INCLUDING ROUTES
const authentication = require('./authentication.route');
const user = require('./user.route');
const role = require('./role.route');
const lab = require('./lab.route');
const service = require('./service.route');
const serviceType = require('./serviceType.route');

// router.get('/', (req, res)=>{
//     res.send('API Page');
// });


// REGESTRING ROUTES
router.use('/authentication', authentication);
router.use('/users', Authenticate, DecodeToken, user);
router.use('/roles', Authenticate, DecodeToken, role);
router.use('/labs', Authenticate, DecodeToken, lab);
router.use('/services', Authenticate, DecodeToken, service);
router.use('/serviceTypes', Authenticate, DecodeToken, serviceType);

module.exports = router;
