const { Pagos } = require("../../db")


const editPagos = async (id_pago) => {

    const editOnePago = await Pagos.update(
        {
            estado_del_pago: true,
        },
        {
            where: { id_pago },
        }
    );
    return editOnePago;

};

module.exports = { editPagos };