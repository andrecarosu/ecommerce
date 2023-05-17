import React, { useEffect, useState } from 'react';
import s from './ProductsVertical.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, getProductByName } from '../../../redux/actions';

const ProductsVertical = ({ handleClickCalificacion }) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const onSearch = (e) => {
        const { name } = e.target
        const { value } = e.target
        setInput(value)
        console.log(value)
        if (value !== "") {
            dispatch(getProductByName(value));
        } else {
            dispatch(getAllProducts())
        }

    }


    const products = useSelector(state => state.products)
    console.log('pille->', products)

    console.log('--------------', products)
    return (
        <div className={s.containerItems}>
            <input
                className={s.searchInput}
                name="search"
                placeholder='Buscar'
                value={input}
                onChange={onSearch}

            />
            <div className={s.itemsMenu}>

                {products.map((wine, index) => {
                    return (
                        <div className={s.item} key={index} onClick={() => handleClickCalificacion(wine.product_id)}>
                            {wine.name}
                        </div>
                    )

                })}
            </div>
        </div>
    );
}

export default ProductsVertical;
