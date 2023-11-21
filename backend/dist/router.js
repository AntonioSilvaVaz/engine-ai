"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const SecurityController = require('./controller/SecurityController');
router.get("/security_list", SecurityController.getAllSecurityList);
router.get("/security_detail/:ticker", SecurityController.getSecurityDetail);
module.exports = router;
