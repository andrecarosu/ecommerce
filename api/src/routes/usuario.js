const { Router } = require("express");
const router = Router();
const { postUserHandler } = require("../handlers/usuarios/postUsuariosHandler");
const { getAllUsersHandler, getUserByIdHandler, validatePasswordUserHandler } = require("../handlers/usuarios/getUsuariosHandler");
const { loginHandler } = require("../handlers/usuarios/loginHandler");
const { actualizarUsuarioHandler, putUserHandler, resetPasswordHandler } = require("../handlers/usuarios/putUsuarioHandler");

router.get("/validate-password", validatePasswordUserHandler)
router.get("/:user_id", getUserByIdHandler)
router.get("/", getAllUsersHandler)
router.post("/", postUserHandler)
router.post('/login', loginHandler)
router.put("/", actualizarUsuarioHandler)
router.put("/delete", putUserHandler)
router.put("/reset-password", resetPasswordHandler)


module.exports = router;