import React, { useEffect, useState } from 'react';
import s from './Calificaciones.module.css'
import ProductsVertical from "../../components/verticalMenu/ProductsVertical";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions';

const Calificaciones = () => {
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch()
    const handleClickCalificacion = (product) => {
        dispatch(getProductById(product))
        setFlag(true)
    }

    useEffect(() => {
        return () => {
            setFlag(false)
        }
    }, [])

    const product = useSelector(state => state.product)



    return (
        <div className={s.containerCalificaciones}>
            <h1>Calificaciones</h1>
            <div className={s.disContainer}>
                <ProductsVertical handleClickCalificacion={handleClickCalificacion} />
                <div className={s.boxCalificaciones}>
                    {!flag ?
                        <div>AQUI SE MOSTRARAN LAS CALIFICACIONES</div> :
                        product?.Reviews?.length > 0 ?
                            itemsCalificaciones(product) :
                            'No hay reviews'}
                </div>
            </div>
        </div>
    );
}


const itemsCalificaciones = (product) => {
    const flat = []

    product.Reviews.forEach((rev, index) => {
        rev.comments.forEach((c) => {
            flat.push({ User: rev.User, comment: c })

        })
    })

    return (
        <div className={s.itemReview}>
            {flat.map((rev, index) => {
                return (
                    <div className={s.rev} key={index}>
                        <div>
                            {rev.User.name}
                        </div>
                        <div>
                            {rev.comment.comment}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Calificaciones;