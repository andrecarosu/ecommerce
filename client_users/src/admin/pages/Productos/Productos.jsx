import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Productos.module.css'
import TableProductos from '../../components/TableProductos/TableProductos';
import Pagination from '../../components/pagination/Pagination';
import usePagination from '../../components/pagination/PaginationHook';
import DetailCard from '../../components/DetailCard/DetailCard';
import { orderedByNameASC, orderedByNameDESC, orderedByHighestPrice, orderedByLowestPrice } from '../../../redux/actions';

const Productos = () => {
    const [detailActive, setDetailActive] = useState(false)
    const [productos, setProductos] = useState([])
    const dispatch = useDispatch()

    const AllProducts = useSelector(state => state.products)
    useEffect(() => {
        setProductos(AllProducts)
    }, [AllProducts])


    let productsFitered = useSelector(state => state.productsFitered)

    // useEffect(() => {
    //     setDetailActive(false)
    // }, [detailActive])

    const handleClickDetail = (product_id) => {
        setDetailActive(product_id)
    }

    const handleFilter = (type, nameFilter) => {
        if (type === 'name') {
            nameFilter === 'A-Z' ?
                dispatch(orderedByNameASC()) :
                dispatch(orderedByNameDESC())
        }

        if (type === 'price') {
            nameFilter === '1-9' ?
                dispatch(orderedByHighestPrice()) :
                dispatch(orderedByLowestPrice())
        }

    }

    useEffect(() => {

        if (productsFitered?.length > 0) {
            setProductos(productsFitered)
            // productos = productsFitered
        }
    }, [dispatch, productsFitered])





    let { currentPage, totalPages, paginatedData, NextPage, PreviousPage } = usePagination(productos, 8)




    console.log(productos)
    return (
        <div className={s.productosContainer}>
            <h1>Productos</h1>
            <TableProductos
                products={paginatedData}
                handleClickDetail={handleClickDetail}
                handleFilter={handleFilter}
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

export default Productos;
