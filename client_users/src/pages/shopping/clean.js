export const clean = (carrito) => {
    const productClean = carrito.map(product => {
        return {
            cantidad: product.cantidad,
            valor_total_cantidad: product.cantidad*product.valor_con_descuento,
            id_producto: product.id_producto,
            valor_unitario: product.valor_con_descuento,
            id_comercio: product.Comercio.id_comercio
        }
    }) 
    return productClean
}