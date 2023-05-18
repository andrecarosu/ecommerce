import React, { useState } from 'react';
import DetailVenta from './DetailVenta';
import { getUserById } from '../../../redux/actions';
import s from './TableVentas.module.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const TableVentas = ({ ventas, handleClickDetail }) => {

    const [filaActive, setFilaActive] = useState(null)
    const dispatch = useDispatch()
    const onClickRow = (e, key) => {
        console.log(e)
        setFilaActive(filaActive == key ? null : key)
    }
    const { allUsers } = useSelector(state => state)
    const getUser = (id) => {

        const u = allUsers.find((user) => user.user_id == id)
        return u?.name
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
                        <th>Email del usuario</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <React.Fragment key={index}>
                            <tr className={s.register} key={venta.id} onClick={(e) => onClickRow(e, index)}>
                                <td style={{ padding: "10px" }}><a>{venta.id}</a></td>
                                <td><a>{venta.total}</a></td>
                                <td><a>{venta.fecha}</a></td>
                                {/* <td><a>{getUser(venta.id_usuario)}</a></td> */}
                                <td><a>{venta.productos[0]?.email}</a></td>
                                <td><a>{venta.estado ? "Exitoso" : "Cancelado"}</a></td>
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
