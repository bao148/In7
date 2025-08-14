'use strict'

const express = require('express')
// const {permission} = require("../auth/checkAuth");
const router = express.Router()

// check permission
// router.use(permission('0000'))
// router.use('', require('./product'))
router.use('', require('./access'))
router.use('', require('./admin'))
module.exports = router