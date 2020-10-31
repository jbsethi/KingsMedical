const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive } = require('../controllers/serviceType/serviceType.controller');


router.route('/')
.get(GetAll)                        // GET ALL Notice
.post(Create)                       // CREATE Notice

router.route('/:id')
.get(Get)                           // GET Notice AGAINST ID
.put(Update)                        // UPDATE Notice
.delete(Delete)                     // DELETE Notice

router.route('/all/records')
.get(GetEachAndEvery)       // GET Notice History

router.route('/all/active')
.get(GetAllActive)       // GET Lab History

module.exports = router;