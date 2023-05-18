import React, { useEffect } from 'react';
import Pagination from '../../components/pagination/Pagination';
import TableUsuarios from '../../components/TableUsuarios/TableUsuarios';
import usePagination from '../../components/pagination/PaginationHook';
import s from './Usuarios.module.css'
import { getAllUsers } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
const Usuarios = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const { allUsers } = useSelector(state => state)
    console.log('pillllllllle', allUsers)

    const { currentPage, totalPages, paginatedData, NextPage, PreviousPage } = usePagination(allUsers, 8)

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
