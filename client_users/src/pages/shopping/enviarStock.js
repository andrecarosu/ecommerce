export default function cleanStock(carrito) {
    const limpio = carrito?.map(p => {
        return {
            product_id: p.product_id,
            newStock: p.stock - p.amount
        }
    })

    return limpio
}