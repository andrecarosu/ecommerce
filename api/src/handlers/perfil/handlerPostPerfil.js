const { createPerfil } = require('../../controllers/perfil/postPerfilController');

const postPerfilHandler = async (req, res) => {
     let {name, address, phone, city, email,image, estado} = req.body
     let data = req.body
          
     try {
      const results = await createPerfil(name, address, phone, city, email,image, estado,data);
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = { postPerfilHandler };