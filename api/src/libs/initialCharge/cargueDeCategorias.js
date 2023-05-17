const fs = require('fs');
const path = require('path');
const { Category_product } = require('../../db');

const loadCategoryProduct = async () => {

    const rutaArchivoCategorías = path.resolve(path.join(__dirname, '..', 'initialRegisters'), 'category.json');

    try {
        const count = await Category_product.count()
        if (count > 0) return;
        const categoriasJSON = fs.readFileSync(rutaArchivoCategorías, 'utf-8');
        const categoriasProduct = JSON.parse(categoriasJSON);
        let mapCategory = categoriasProduct.map((prop) => ({
            name: prop.name,
            image: prop.image,
            family: prop.family,
        }));

        await Category_product.bulkCreate(mapCategory, { validate: true });
        console.log('se guardaron las categorías de productos correctamente');
    } catch (error) {
        console.log('Error al cargar las categorías de productos', error);
    }
};

module.exports = { loadCategoryProduct };