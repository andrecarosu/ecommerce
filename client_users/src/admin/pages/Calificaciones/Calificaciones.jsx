import React, { useEffect, useState } from 'react';
import s from './Calificaciones.module.css'
import ProductsVertical from "../../components/verticalMenu/ProductsVertical";
import Loader from '../../../components/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCommentSlash } from "@fortawesome/free-solid-svg-icons";



const Calificaciones = () => {
    const [flag, setFlag] = useState(false)
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()
    const handleClickCalificacion = (product) => {
        setTimeout(() => {
            setLoad(false)
        }, 500)
        setLoad(true)
        dispatch(getProductById(product))
        setFlag(true)
    }

    useEffect(() => {
        return () => {
            setFlag(false)
        }
    }, [])


    const componentBox = () => {
        if (!load) {

            return product?.Reviews?.length > 0 && !load ?
                itemsCalificaciones(product) :
                <div className={s.contInitial}>
                    NO HAY REVIEWS
                    <FontAwesomeIcon size="7x" icon={faCommentSlash} />
                </div>

        }

    }

    const product = useSelector(state => state.product)



    return (
        <div className={s.containerCalificaciones}>
            <h1>Calificaciones</h1>
            <div className={s.disContainer}>
                <ProductsVertical handleClickCalificacion={handleClickCalificacion} />
                <div className={s.boxCalificaciones}>
                    {load ? <div className={s.loadad}><Loader /></div> : ''}


                    {!flag ?
                        <div className={s.contInitial}>
                            AQUI SE MOSTRARAN LAS <br />CALIFICACIONES
                            <FontAwesomeIcon size="7x" icon={faComment} />
                        </div> :
                        componentBox()
                    }
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
