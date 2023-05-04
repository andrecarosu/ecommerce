const { NOMEM } = require("dns")

module.exports = validacionProducto = (product) => {
    const {
        name,
        normal_price,
        discount_price,
        description,
        stock,
        image,
        brand,
        state
    } = product

    if (!name || !normal_price || !description
        || !stock || !brand || !state) {
        throw new Error("Todos los campos son obligatorios  ")
    }

    //--------------------name--------------------------------
    if (typeof name !== "string") {
        throw new Error("El nombre debe ser un string");
    }

    if (!/^[a-zA-Z0-9\u00F1\u00f1\s\.-]+$/.test(name)) {
        throw new Error('El formato del name no es adecuado')
    }

    if (name.length < 5) {
        throw new Error("El nombre del producto debe ser mayor a 4")
    }

    if (name.length > 40) {
        throw new Error("El nombre debe ser menor a 40")
    }

    //-------------------!normal_price-----------------

    if (typeof normal_price !== "number") {
        throw new Error("El precio debe ser un numero");
    }

    if (normal_price < 500) {
        throw new Error("El precio debe ser mayor a 500")
    }

    //-----------------------description--------------

    if (typeof description !== "string") {
        throw new Error("la descripcion debe ser un string");
    }

    // if (!/^[a-zA-Z0-9\u00F1\u00f1\s\.-]+$/.test(description)) {
    //     throw new Error('El formato de la descripcion no es adecuado')
    // }

    if (description.length < 10) {
        throw new Error("La descripcion del producto debe ser mayor a 10")
    }

    if (description.length > 1000) {
        throw new Error("El nombre debe ser menor a 300")
    }

    //-----------------stock---------------------------
    if (typeof stock !== "number") {
        throw new Error("El stock debe ser un numero");
    }

    if (stock > 50 || stock < 0) {
        throw new Error("El stock debe estar entre 0 y 50")
    }

    //-----------------brand--------------------------
    if (typeof brand !== "string") {
        throw new Error("La marca debe ser un string");
    }

    if (!/^[a-zA-Z0-9\u00F1\u00f1\S\s]+$/.test(brand)) {
        throw new Error('El formato de la marca no es adecuado')
    }

    if (name.length < 5) {
        throw new Error("El nombre del producto debe ser mayor a 4")
    }

    if (name.length > 40) {
        throw new Error("El nombre debe ser menor a 40")
    }

    // ---------------image---------------------------
    if (image && typeof image !== "string") {
        throw new Error("Imagen debe ser un string");
    }



}