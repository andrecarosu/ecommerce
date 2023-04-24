const fs = require('fs');
const path = require('path');
const { Ciudad } = require('../../db');

const loadCities = async () => {
  const rutaArchivoCiudades = path.resolve(__dirname, 'ciudades.json');
  
  try {
    const ciudadesJSON = fs.readFileSync(rutaArchivoCiudades, 'utf8');
    const ciudades = JSON.parse(ciudadesJSON);
    let mapCiudades = ciudades.map((prop) => ({ id_ciudad: prop.id,
        nombre_ciudad: prop.nombre }));
    
    await Ciudad.bulkCreate(mapCiudades, { validate: true });
    
    console.log('Datos de las ciudades cargados exitosamente');
        
  } catch (error) {
    console.error('Error al cargar los datos de las ciudades', error);
  }
};

module.exports = { loadCities };