import React, { useEffect, useState } from 'react';
import FormCreateProduct from '../../components/formCreateProduct/FormCreateProduct';
import TableVentas from '../../components/TableVentas/TableVentas';
import s from './Ventas.module.css'
import { getAllSales } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import DetailCard from '../../components/DetailCard/DetailCard';
import Pagination from '../../components/pagination/Pagination';
import usePagination from '../../components/pagination/PaginationHook';

const Ventas = () => {
    const [detailActive, setDetailActive] = useState(false)

    const dispatch = useDispatch()
    useEffect(async () => {
        await dispatch(getAllSales())
    }, [])

    const handleClickDetail = (product_id) => {
        setDetailActive(product_id)
    }

    const ventas = useSelector(state => state.compras)
    console.log('ventas---->', ventas)

    let { currentPage, totalPages, paginatedData, NextPage, PreviousPage } = usePagination(ventas, 8)

    return (
        <div className={s.ventasContainer}>
            <h1>Ventas</h1>
            <TableVentas
                ventas={paginatedData}
                handleClickDetail={handleClickDetail}
            // handleFilter={handleFilter}
            />
            {detailActive ? <DetailCard product_id={detailActive} handleClickDetail={handleClickDetail} /> : null}
            <Pagination
                NextPage={NextPage}
                PreviousPage={PreviousPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}

export default Ventas;
