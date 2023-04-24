const { Motivo_calificacion } = require("../../db");


const crearCalificacion = async (req, res) => {
    try {
        const id_producto = req.params.idProduct;
      const { descripcion_motivo, valor_calificacion } = req.body;
  
      const nuevaCalificacion = await Motivo_calificacion.create({
        id_producto,
        descripcion_motivo,
        valor_calificacion,
      });
  
      res.status(201).json(nuevaCalificacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear la calificación' });
    }
  };
 
  const obtenerCalificaciones = async (req, res) => {
    try {
      const id_producto = req.params.idProduct;
  
      const calificaciones = await Motivo_calificacion.findAll({
        where: {
          id_producto,
        },
      });
  
      res.status(200).json(calificaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las calificaciones' });
    }
  };

  module.exports = {
    crearCalificacion,
    obtenerCalificaciones
  };