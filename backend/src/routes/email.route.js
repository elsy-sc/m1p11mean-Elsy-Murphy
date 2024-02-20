const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { sendMail } = require("../controllers/email.controller");
const router = express.Router();

router.post("/send", sendMail);

module.exports = getRouter(express, router, '/mail');