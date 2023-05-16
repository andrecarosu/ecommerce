const { PerfilGoogle } = require("../../db");
const { Op } = require("sequelize")
const {getPerfilByEmail} = require("../perfil/getPerfilController")


const createPerfil = async (email, perfil) =>{
 const data = getPerfilByEmail(email)
 if (data) {
    await PerfilGoogle.update(perfil,{
        where: {email},
        returning: true
    })
 } else {

    let mapPerfil = perfil.map((prop) => ({
        name: prop.name? prop.name: "",
        address: prop.address? prop.address: "",
        phone: prop.phone? prop.phone: "",
        city: prop.city ? prop.city : "",
        email: prop.email ? prop.email: "",
        image: prop.image ? prop.image: "",
        estado: prop.estado ? prop.estado: false,
    }));

    await PerfilGoogle.bulkCreate(mapPerfil);


    
 }
}

module.exports = { createPerfil};

