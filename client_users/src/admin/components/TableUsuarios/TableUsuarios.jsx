import React from 'react';
import CheckState from "./CheckBox_user/CheckState"
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
                        <th>Telefono</th>
                        <th>Ciudad</th>
                        <th>Direccion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td><a>{person.name}</a></td>
                            <td><a>{person.email}</a></td>
                            <td><a>{person.phone}</a></td>
                            <td><a>{person.city}</a></td>
                            <td><a>{person.address}</a></td>
                            <td>{
                                <CheckState user_id={person.user_id} state={person.estado} />
                            }</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    );
}

export default TableUsuarios;
