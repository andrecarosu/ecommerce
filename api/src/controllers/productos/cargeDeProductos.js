const fs = require('fs');
const path = require('path');
const { Producto } = require('../../db');

const loadProducts = async () =>{
const rutaArchivoProductos = path.resolve(__dirname, 'productos.json');

try {
    const productosJSON = fs.readFileSync(rutaArchivoProductos, 'utf-8');
    const productos = JSON.parse(productosJSON);
    let mapProductos = productos.map((prop) => ({
    nombre: prop.nombre,
    fecha_inicial: prop.fecha_inicial,
    fecha_final: prop.fecha_final,
    descripcion_producto: prop.descripcion_producto,
    cantidad: prop.cantidad,
    existencia: prop.existencia,
    valor_normal:prop.valor_normal,
    valor_con_descuento: prop.valor_con_descuento,
    condicion: prop.condicion,
    imagen: prop.imagen,
    id_categoria_producto: prop.id_categoria_producto,
    id_comercio: prop.id_comercio
    }));

    await Producto.bulkCreate(mapProductos);
    console.log('se guardaron los productos correctamente');
} catch (error) {
   console.log('Error al cargar los productos', error); 
}
};

module.exports = {loadProducts};