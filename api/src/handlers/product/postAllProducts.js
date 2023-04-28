const { loadProducts } = require('../../controllers/product/cargeDeProductos');

const postAllProductsHandler = async (req, res) => {
  try {
    const results = await loadProducts();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postAllProductsHandler };