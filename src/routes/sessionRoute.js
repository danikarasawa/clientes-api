const express = require("express")
const router = express.Router()
const controller = require("../controllers/sessionController")

router.post("/sessions", controller.accessToken)

module.exports = router

//SESSION É O LOGIN 