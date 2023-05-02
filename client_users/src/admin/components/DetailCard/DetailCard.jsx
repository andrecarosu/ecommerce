import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/actions';
import s from './DetailCard.module.css'

const DetailCard = ({ product_id, handleClickDetail }) => {
    const dispatch = useDispatch()
    console.log('--->', product_id)

    useEffect(() => {
        dispatch(getProductById(product_id))
    }, [product_id])
    const product = useSelector(state => state.product)
    if (Object.keys(product).length == 0) {
        return <div></div>
    }
    console.log(product)
    return (
        <div className={s.globalDetail}>
            <div className={s.containerDetail}>
                <button className={s.closeButton} onClick={() => handleClickDetail(false)}>X</button>
                <div className={s.s1}>

                    <div className={s.distribution}>
                        <div className={s.row}>
                            <span>Name <br /> {product.name}</span>
                            <span>Brand<br />{product.brand}</span>
                        </div>
                        <div className={s.row}>
                            <span>Precio <br /> {product.normal_price}</span>
                            <span>Descuento<br />{product.discount_price}</span>
                        </div>

                    </div>
                    <>

                    </>
                </div>
                <div className={s.image}>
                    <div className={s.imageContainer}>
                        <img src={product.image} />
                    </div>
                </div>
                <div className={s.description}>
                    <span>
                        Descripcion
                    </span>
                    <div className={s.boxDescription}>
                        {product.description}
                    </div>

                </div>
                <div className={s.s2}>
                    <div className={s.distribution}>
                        <div className={s.row}>
                            <span>Categoria <br /> {product.Category_product.family + ' ' + product.Category_product.name}</span>
                            <span>Fecha<br />{
                                new Date(product.createdAt).toLocaleString('es-ES', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                })
                            }</span>
                        </div>
                        <div className={s.row}>
                            <span>Stock <br /> {product.stock}</span>
                            <span>State<br />{product.state ? 'true' : 'false'}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailCard;
