const {loadCities} = require ("./postCitiesController");
const {Ciudad} = require("../../db");


const verifyDb = async () =>{
    const aux = await Ciudad.count();
    if(aux < 1) await loadCities() ;
  }

const getAllCities = async () =>{
try {

   await verifyDb();  

   const dataCities = await Ciudad.findAll({
    attributes: [
      "id_ciudad",
      "nombre_ciudad",
    ],
  });
  const results =  [...dataCities];
  return results;
} catch (error) {
   console.error(error); 
}
}
module.exports = {getAllCities};






