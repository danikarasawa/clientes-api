const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")

router.get("/", controller.get)
router.get("/compradores", controller.getBuy)
router.get("/:cpf", controller.getByCPF)

router.post("/", controller.post)

module.exports = router
