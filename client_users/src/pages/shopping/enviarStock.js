export default function cleanStock(carrito) {
    const limpio = carrito?.map(p => {
        return {
            id_producto: p.id_producto,
            nuevoStock: p.existencia - p.cantidad
        }
    })

    return limpio
}