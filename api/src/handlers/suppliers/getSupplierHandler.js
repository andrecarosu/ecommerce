const { getAllSuppliers, getSupplierById, getSupplierByName} = require("../../controllers/supplier/getSupplierController");

const getAllSupliersHandler = async (req, res, next) => {
  const { name } = req.query;
  try {
    const results = name ? await getSupplierByName(name) : await getAllSuppliers()

    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
};


const getSupplierByIdHandler = async (req, res, next) => {
  const { idSupplier } = req.params
  try {
    const SupplierId = await getSupplierById(idSupplier)
    res.status(200).json(SupplierId)
  } catch (error) {
    next(error)
  }
};



module.exports = {
  getAllSupliersHandler,
  getSupplierByIdHandler
}


