import React, { useState } from 'react';
import DetailVenta from './DetailVenta';
import s from './TableVentas.module.css'

const TableVentas = ({ ventas, handleClickDetail }) => {

    const [filaActive, setFilaActive] = useState(null)

    const onClickRow = (e, key) => {
        console.log(e)
        setFilaActive(filaActive == key ? null : key)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "100px" }}>ID{' '}

                        </th>
                        <th>Total</th>
                        <th>Fecha de Orden</th>
                        <th>User</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <React.Fragment key={index}>
                            <tr className={s.register} key={venta.id} onClick={(e) => onClickRow(e, index)}>
                                <td style={{ padding: "10px" }}><a>{venta.id}</a></td>
                                <td><a>{venta.total}</a></td>
                                <td><a>{venta.fecha}</a></td>
                                <td><a>{'ads'}</a></td>
                                <td><a>{venta.estado}</a></td>
                            </tr>
                            {<tr key={index} className={`${s.detail} ${filaActive == index ? s.activeRow : ''}`}>
                                <td className={`${s.tdDetail} `} colSpan="5">
                                    <DetailVenta
                                        active={filaActive == index ? true : false}
                                        productos={venta.productos}
                                        handleClickDetail={handleClickDetail} />
                                </td>
                                {/* ${active ? s.activeRow : '' */}
                            </tr>}
                        </React.Fragment>

                    ))}
                </tbody>

            </table>
        </>
    );
}

export default TableVentas;
