import React, { useEffect } from 'react';
import s from './Categorias.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFamilies } from '../../../redux/actions';

const Categorias = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFamilies())
    }, [dispatch])
    const { families } = useSelector(state => state)

    // const categoriasMatch = categorys ? categorys.flat(obj => obj?.categories)?.map(cat => {
    //     return { category_id: cat.category_id, name: cat.name }
    // }) : []
    console.log('-------------->', families)


    return (
        <div className={s.categoriasContainer}>
            <h1>Categorias</h1>

            <div className={s.display}>
                {families ?
                    families.map((f, index) => {
                        return (
                            <div className={s.infoContainer} key={index}>
                                <div className={s.family}>
                                    <span>{f.family[0]}</span>
                                    {f.family}
                                </div>


                                {
                                    f.categories ?
                                        f.categories
                                            .map((category, i) => {
                                                return (
                                                    <div className={s.category} key={i}>
                                                        <img src={category.image} />
                                                    </div>
                                                )
                                            })
                                        : ''
                                }

                            </div>
                        )
                    })
                    : ''}

            </div>


        </div >
    );
}

export default Categorias;
