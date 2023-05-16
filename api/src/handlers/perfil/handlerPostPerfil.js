const { createPerfil } = require('../../controllers/perfil/postPerfilController');

const postPerfilHandler = async (req, res) => {
     const {email} = req.body
     const {perfil} = req.body
     
     try {
      const results = await createPerfil(email,perfil);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = { postPerfilHandler };