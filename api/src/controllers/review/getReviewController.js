const { Product, Detail_order, User, Review } = require("../../db");
const { Op } = require("sequelize")

const getAllReviews = async (req, res) => {
    try {
      const product_id = req.params.id;
      console.log(1,product_id);

    const calificaciones = await Review.findAll({
        where: {
          product_id: product_id,
        },

        include: [
          { model: Detail_order, attributes: ["email"] },
        ],
      });
      
    
      res.status(200).json(calificaciones);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las calificaciones' });
    }
  };



module.exports = { getAllReviews }