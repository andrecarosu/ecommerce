import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './CheckState.module.css'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, allProducts } from '../../../../redux/actions';

const CheckState = ({ product_id, state }) => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(state)
    const url = process.env.REACT_APP_DEPLOYBACK_URL
    useEffect(() => {
        setCheck(state)
    }, [state])



    // useEffect(async () => {


    // }, [check])

    const request = async (value) => {
        try {
            console.log(value)
            await axios.put(`${url}/products/${product_id}`, { state: value });
            dispatch(getAllProducts())
            dispatch(allProducts(true))

        } catch (error) {
            console.error(error)
        }
    }



    const onCheckState = (e) => {
        let { value } = e.target
        value = value === 'true'


        swal({
            title: `¿Seguro que quieres ${value ? 'deshabilitar' : 'habilitar'} el producto?`,
            icon: 'warning',
            buttons: {

                Aceptar: {
                    text: "Aceptar",
                    value: "accept",
                },
                Cancelar: {
                    text: "Cancelar",
                    value: "cancel"
                },
            },
            dangerMode: true,

        }).then(async (result) => {
            if (result == 'accept') {
                await request(!value)
                setCheck(!check)

            } else {
                console.log("Cambio cancelado")
            }
        })
        //setCheck(!check)
    }
    return (
        <div onClick={(event) => event.stopPropagation()}>
            <label className={s.switch}>
                <input type="checkbox" name="state" value={check} onChange={onCheckState} checked={check} />
                <span className={`${s.slider} ${s.round}`}></span>
            </label>
        </div>
    );
}

export default CheckState;
