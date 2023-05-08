import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './CheckState.module.css'
import swal from 'sweetalert';

const CheckState = ({ product_id, state }) => {
    const [check, setCheck] = useState(false)

    useEffect(() => {
        setCheck(state)
    }, [state])

    useEffect(async () => {
        try {
            await axios.put(`https://ecommerce-khaki-nine.vercel.app/products/${product_id}`, { state: check });
        } catch (error) {
            console.error(error)
        }

    }, [check])

    const onCheckState = (e) => {
        swal({
            title: "¿Seguro que quieres deshabilitar el producto?",
            icon: 'warning',
            buttons: ["Aceptar", "Cancelar"],
            dangerMode: true,

        }).then(value => {
            if (!value) {
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
