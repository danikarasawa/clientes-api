const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")
const authMiddleware = require("../middlewares/auth")

router.get("/", controller.get)
router.post("/", controller.postClient)

/**
 * @api {get} /clientes
 * @apiGroup Clientes
 * *
 * @apiSuccess {Object []}
*/

router.use(authMiddleware);

router.get("/compradores", controller.getBuy)
router.get("/:cpf", controller.getByCPF)
router.put("/:cpf", controller.updateCPF)
router.delete("/:id", controller.removeID)

module.exports = router