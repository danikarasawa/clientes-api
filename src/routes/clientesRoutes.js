const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")

router.get("/", controller.get)
router.get("/compradores", controller.getBuy)
router.get("/:cpf", controller.getByCPF)

router.post("/", controller.postClient)

router.put("/:cpf", controller.updateCPF)

router.delete("/:id", controller.removeID)

module.exports = router