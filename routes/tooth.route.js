const express = require('express');
const router = express.Router();
const { GetAll, Get, Create, Update, Delete, GetEachAndEvery, GetAllActive } = require('../controllers/tooth/tooth.controller');


router.route('/')
.get(GetAll)                        // GET ALL Lab
.post(upload.single('image'), Create)                       // CREATE Lab

router.route('/:id')
.get(Get)                           // GET Lab AGAINST ID
.put(upload.single('image'), Update)                        // UPDATE Lab
.delete(Delete)                     // DELETE Lab

router.route('/all/records')
.get(GetEachAndEvery)       // GET Lab History

router.route('/all/active')
.get(GetAllActive)       // GET Lab All Active

module.exports = router;