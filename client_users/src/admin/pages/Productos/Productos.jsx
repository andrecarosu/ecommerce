import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from './Productos.module.css'
import TableProductos from '../../components/TableProductos/TableProductos';
import Pagination from '../../components/pagination/Pagination';
import usePagination from '../../components/pagination/PaginationHook';
import DetailCard from '../../components/DetailCard/DetailCard';
import { getAllProducts } from '../../../redux/actions';
import { orderedByNameASC, orderedByNameDESC, orderedByHighestPrice, orderedByLowestPrice, getProductByCategory } from '../../../redux/actions';

const Productos = () => {
    const [detailActive, setDetailActive] = useState(false)
    const [productos, setProductos] = useState([])
    const dispatch = useDispatch()

    // const AllProducts = useSelector(state => state.products)
    // useEffect(() => {
    //     setProductos(AllProducts)
    // }, [AllProducts])

    useEffect(() => {
        return () => {
            dispatch(getAllProducts())
        }
    }, [])

    let productsFitered = useSelector(state => state.productsFitered)

    // useEffect(() => {
    //     setDetailActive(false)
    // }, [detailActive])

    const handleClickDetail = (product_id) => {
        setDetailActive(product_id)
    }

    const handleFilter = (type, value) => {
        if (type === 'name') {
            value === 'A-Z' ?
                dispatch(orderedByNameASC()) :
                dispatch(orderedByNameDESC())
        }

        if (type === 'price') {
            value === '1-9' ?
                dispatch(orderedByHighestPrice()) :
                dispatch(orderedByLowestPrice())
        }

        if (type === 'category') {
            value.toLowerCase().includes('category') ?
                dispatch(getAllProducts())
                : dispatch(getProductByCategory(value))
        }

    }

    useEffect(() => {

        console.log(productsFitered)
        setProductos(productsFitered)
        // productos = productsFitered

    }, [dispatch, productsFitered])





    let { currentPage, totalPages, paginatedData, NextPage, PreviousPage } = usePagination(productos, 8)




    console.log(productos)
    return (
        <div className={s.productosContainer}>
            <h1>Productos</h1>
            <Link to='/dashboard/productos/crear-producto'><button>Crear Producto</button></Link>
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
