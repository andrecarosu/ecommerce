const { Comercio, Pagos, Detalle_venta, Producto, } = require("../../db");


const getPagos = async () => {
    // buscar todas en la bd
    const databasePagos = await Pagos.findAll({

        include: [{ model: Comercio }]

    });

    return databasePagos;
};

const getPagosAdmin_Comercio = async (id_comercio) => {

    const AllPagos = await Pagos.findAll({
        where: {
            id_comercio
        },
        include: [
            { model: Comercio },
            {
                model: Detalle_venta,
                include: [{ model: Producto }]
            }
        ]

    })

    return AllPagos
}

module.exports = {
    getPagos, getPagosAdmin_Comercio
};