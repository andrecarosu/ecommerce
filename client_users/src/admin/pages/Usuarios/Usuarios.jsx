import React from 'react';
import Pagination from '../../components/pagination/Pagination';
import TableUsuarios from '../../components/TableUsuarios/TableUsuarios';
import usePagination from '../../components/pagination/PaginationHook';
import s from './Usuarios.module.css'
const Usuarios = () => {
    console.log('entro')
    const { currentPage, totalPages, paginatedData, NextPage, PreviousPage } = usePagination(persons, 8)

    return (
        <div className={s.usuariosContainer}>
            <h1>Usuarios suscritos</h1>
            <TableUsuarios persons={paginatedData} />
            <Pagination
                NextPage={NextPage}
                PreviousPage={PreviousPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}


const persons = [
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Alberto', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
    { name: 'Julian', email: 'julian@ejemplo.com', direccion: 'Aevnida Quintana', Fecha: '24/08/12' },
]




export default Usuarios;
