const { Router } = require("express");
const router = Router();
const { getPerfilByEmailHandler} = require("../handlers/perfil/handlerGetPerfil");
const {postPerfilHandler} = require("../handlers/perfil/handlerPostPerfil")
router.get("/", getPerfilByEmailHandler)
router.post("/", postPerfilHandler)


module.exports = router;