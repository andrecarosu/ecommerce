import React from 'react';
import usePagination from '../pagination/PaginationHook';
import s from './TableUsuarios.module.css'




const TableUsuarios = (props) => {
    const { persons } = props


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Direccion</th>
                        <th>Fecha de Creacion</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td><a>{person.name}</a></td>
                            <td><a>{person.email}</a></td>
                            <td><a>{person.direccion}</a></td>
                            <td><a>{person.Fecha}</a></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    );
}

export default TableUsuarios;
