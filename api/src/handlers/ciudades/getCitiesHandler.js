const {getAllCities} = require("../../controllers/ciudades/getCiudadController");

const getAllCitiesHandler = async (req,res,next) =>{
    try {
        const results = await getAllCities();
        res.status(200).json(results)
    } catch (error) {
        next(error)
    }
};

module.exports = {getAllCitiesHandler};