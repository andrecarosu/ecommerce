const { getPerfilByEmail , getAllEmailPerfil} = require("../../controllers/perfil/getPerfilController");



const getPerfilByEmailHandler = async (req, res, next) => {
  const { email } = req.query;
  try {
    const UserEmail = email? await  getPerfilByEmail(email) : await getAllEmailPerfil()
    res.status(200).json(UserEmail)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getPerfilByEmailHandler,
}
