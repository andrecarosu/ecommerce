const {searchProductByName, getAllProducts, getProductById, getAllCategorias} = require("../../controllers/productos/getProductoController")


const getAllProductsHandler = async (req, res, next)=>{
    const {name} = req.query;
    try {
      const results = name ? await searchProductByName(name) : await getAllProducts()
    
    res.status(200).json(results)
    } catch (error) {
      next(error)
    }
    
    }

 const getProductByIdhandler = async (req,res,next)=>{
    const {idProduct} = req.params
    try {
        const ProductId = await getProductById(idProduct)
        res.status(200).json(ProductId)
    } catch (error) {
       next(error)  
    }
 }

 const getCategoriasHandler = async (req, res) => {
  try {
    const categorias = await getAllCategorias();

    res.status(200).json( categorias );

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 
module.exports ={
    getAllProductsHandler,
    getProductByIdhandler,
    getCategoriasHandler
   
}