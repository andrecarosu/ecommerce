import React from 'react';
import s from './DetailVenta.module.css'

const DetailVenta = ({ active, productos, handleClickDetail }) => {

    const count = productos.length



    return (
        <div className={`${s.tableDetail} ${active ? s.show : ''}`} style={{ '--d': count }}>
            <table className={s.detailTable}>
                <thead>
                    <tr>
                        <th style={{ width: "100px" }}>ID{' '}

                        </th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Valor Unitario</th>
                        <th>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                    {productos?.map((p, index) => (
                        <tr className={s.register} key={index}>
                            <td style={{ padding: "10px" }}><a>{p.id}</a></td>
                            <td>
                                <a className={s.textProduct} onClick={() => handleClickDetail(p.id)}>{p?.name}</a>

                            </td>
                            <td><a>{p?.cantidad}</a></td>
                            <td><a>{p?.valor_unitario}</a></td>
                            <td><a>{p?.valor_total}</a></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default DetailVenta;
