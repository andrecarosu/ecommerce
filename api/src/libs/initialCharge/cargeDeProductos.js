const fs = require('fs');
const path = require('path');
const { Product } = require('../../db');
//const { getAllCategorias } = require("./cargueDeCategorias")

const loadProducts = async () => {

    const rutaArchivoProductos = path.resolve(path.join(__dirname, '..', 'initialRegisters'), 'productos.json');
    try {
        //await getAllCategorias()
        const count = await Product.count()
        if (count > 0) return;
        const productosJSON = fs.readFileSync(rutaArchivoProductos, 'utf-8');
        const productos = JSON.parse(productosJSON);
        let mapProductos = productos.map((prop) => ({
            name: prop.name,
            normal_price: prop.normal_price,
            discount_price: prop.discount_price,
            description: prop.description,
            stock: prop.stock,
            amount: prop.amount,
            image: prop.image,
            brand: prop.brand,
            state: prop.state,
            category_id: prop.category_id,
        }));

        await Product.bulkCreate(mapProductos);
        console.log('se guardaron los productos correctamente');
    } catch (error) {
        console.log('Error al cargar los productos');
    }
};

module.exports = { loadProducts };