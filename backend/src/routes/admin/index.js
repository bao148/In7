'use strict'

const express = require('express')
const accessController = require('../../controllers/authController')
const asyncHandler = require("../../helpers/asyncHandler");
const {authentication,authorization} = require("../../auth/auth.Utils");
const router = express.Router()

const authController = require('../../controllers/authController');


router.post('/admin',authorization('[admin]'), asyncHandler(authController.Admin))



module.exports = router;