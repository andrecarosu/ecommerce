import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './CheckState.module.css'
import swal from 'sweetalert';

const CheckState = ({ user_id, state }) => {
    const [check, setCheck] = useState(false)

    useEffect(() => {
        setCheck(state)
    }, [state])

    useEffect(async () => {
        try {
            await axios.put(`http://localhost:3001/usuario`, { user_id: user_id, estado: check });
        } catch (error) {
            console.error(error)
        }

    }, [check])

    const onCheckState = (e) => {
        swal({
            title: "¿Seguro que quieres deshabilitar al usuario?",
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
            // buttons: ["Aceptar", "Cancelar"],
            dangerMode: true,

        }).then(value => {
            console.log(value)
            switch (value) {
                case "accept":
                    setCheck(!check)
                    break;
                case "cancel":
                    break;
                default:
                    break;
            }
            // if (!value) {
            //     setCheck(!check)
            // } else {
            //     console.log("Cambio cancelado")
            // }
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
