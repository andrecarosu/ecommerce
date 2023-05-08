import React, { useEffect } from 'react';
import s from './ProductsVertical.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../redux/actions';

const ProductsVertical = ({ handleClickCalificacion }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const products = useSelector(state => state.products)
    console.log('--------------', products)
    return (
        <div className={s.itemsMenu}>
            {products.map((wine, index) => {
                return (
                    <div className={s.item} key={index} onClick={() => handleClickCalificacion(wine.product_id)}>
                        {wine.name}
                    </div>
                )

            })}
        </div>
    );
}

export default ProductsVertical;
