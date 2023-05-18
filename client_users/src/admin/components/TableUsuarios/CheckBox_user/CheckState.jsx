import React, { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import s from './CheckState.module.css'
import swal from 'sweetalert';
import { getAllUsers } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';

const CheckState = ({ user_id, state }) => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(state)
    const url = process.env.REACT_APP_DEPLOYBACK_URL

    useEffect(() => {
        setCheck(state)
    }, [state])

    useEffect(async () => {
        try {
            await axios.put(`${url}/usuario`, { user_id: user_id, estado: check });
            dispatch(getAllUsers())
        } catch (error) {
            console.error(error)
        }

    }, [check])

    const onCheckState = (e) => {
        let { value } = e.target
        value = value === 'true'
        swal({
            title: `¿Seguro que quieres ${value ? 'deshabilitar' : 'habilitar'} al usuario?`,
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
