const { PerfilGoogle } = require("../../db");
const { Op } = require("sequelize")
const {getPerfilByEmail} = require("../perfil/getPerfilController")


const createPerfil = async (name, address,phone,city,email,image,estado,data) =>{
    const email1= email
    console.log(111,email1);
    
 const datos = await  getPerfilByEmail(email1)
  console.log(222,datos);
 if (datos.length === 0) {
    
    await PerfilGoogle.create({
        name, address, phone, city,email,image, estado
    })
    
 } else {



await PerfilGoogle.update(data,{
    where: {email: email1},
    returning: true
})
    
 }
}

module.exports = { createPerfil};

