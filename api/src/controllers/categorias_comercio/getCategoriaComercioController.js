const { Categoria_comercio } = require("../../db");

let categorias = [
    "Accesorios para Vehículos",
    "Agro",
    "Animales y Mascotas",
    "Antigüedades y Colecciones",
    "Antigüedades",
    "Arquitectura y Diseño",
    "Arte y Manualidades",
    "Baños",
    "Bar",
    "Bazar y Cocina",
    "Belleza y Cuidado Personal",
    "Boutique",
    "Café",
    "Carnicería y Embutidos",
    "Celulares y Teléfonos",
    "Camas, Colchones y Accesorios",
    "Centro comercial",
    "Confitería",
    "Construcción",
    "Criptomonedas",
    "Cuidado del Hogar y Lavandería",
    "Droguería",
    "Electrodomésticos",
    "Electrónica, Audio y Video",
    "Entradas para Eventos",
    "Farmacia y Perfumes",
    "Ferretería",
    "Heladería",
    "Herramientas",
    "Hogar y Muebles",
    "Hotel",
    "Iluminación para el Hogar",
    "Industrias y Oficinas",
    "Infraestructura Rural",
    "Inmuebles",
    "Instrumentos Musicales",
    "Jardinería y Aire Libre",
    "Joyería",
    "Juguetería",
    "Librería",
    "Licorería",
    "Mayorista",
    "Mercería",
    "Minorista",
    "Música, Películas y Series",
    "Otras categorías",
    "Peluquería",
    "Plomería",
    "Repostería",
    "Restaurante",
    "Ropa y Accesorios",
    "Servicios",
    "SexShop",
    "Souvenirs, Cotillón y Fiestas",
    "Tecnología",
    "Tiendas de deportes",
    "Tintorería",
    "Verdulería",
    "Videojuegos",
]


const getCategoriaComecio = async () => {

    categorias.forEach(async (categoria, i) => {

        const encontrado = await Categoria_comercio.findOne({ where: { nombre_categoria_comercio: categoria } });

        if (encontrado === null) {
            const crearCategoria = await Categoria_comercio.create({
                nombre_categoria_comercio: categoria,
                id_categoria_comercio: i+1

            })
        }
    });

    const allCategorias = await Categoria_comercio.findAll();
    return allCategorias
}

module.exports = { getCategoriaComecio };
