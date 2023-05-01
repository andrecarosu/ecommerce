const { Router } = require("express");
const router = Router();
const { getUserByEmailHandler, getCommerceByEmailHandler } = require("../handlers/email/handlerGetEmail");

router.get("/", getUserByEmailHandler)


module.exports = router;