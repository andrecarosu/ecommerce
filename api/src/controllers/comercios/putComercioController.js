const bcrypt = require("bcrypt");
const { Comercio } = require("../../db")

const editCommerce = async (id_comercio, id_categoria_comercio, id_ciudad, nombre_comercio, direccion, telefono, estado, nombre_contacto, cargo, email, imagen) => {
    
    const editOneCommerce = await Comercio.update(
        {
            id_categoria_comercio,
            id_ciudad,
            nombre_comercio,
            direccion,
            telefono,
            estado,
            nombre_contacto,
            cargo,
            email,
            imagen
        },
        {
            where: { id_comercio },
        }
        );
        
        return editOneCommerce;
    };
    
    const editPassword = async (password)=>{
        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword
        }
}

module.exports = { editCommerce };