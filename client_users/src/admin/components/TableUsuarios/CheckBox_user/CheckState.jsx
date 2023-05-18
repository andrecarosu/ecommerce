import React, { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import s from './CheckState.module.css'
import swal from 'sweetalert';
import { getAllUsers } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const CheckState = ({ user_id, state }) => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(state)
    const url = process.env.REACT_APP_DEPLOYBACK_URL

    useEffect(() => {
        setCheck(state)
    }, [state])

    // useEffect(async () => {
    //     try {
    //         await axios.put(`${url}/usuario`, { user_id: user_id, estado: check });
    //         dispatch(getAllUsers())
    //     } catch (error) {
    //         console.error(error)
    //     }

    // }, [check])
    const allUsers = useSelector(state => state)
    const request = async (value) => {
        try {
            console.log(value)
            await axios.put(`${url}/usuario`, { user_id: user_id, estado: value });
            // dispatch({ type: actions.GET_ALL_USERS, payload: [] })
            dispatch(getAllUsers())


        } catch (error) {
            console.error(error)
        }
    }

    const onCheckState = (e) => {
        let { value } = e.target
        let bool_state = value === 'true'

        swal({
            title: `¿Seguro que quieres ${bool_state ? 'deshabilitar' : 'habilitar'} al usuario?`,
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

        }).then(async (res) => {
            console.log(res)
            switch (res) {
                case "accept":
                    await request(!bool_state)
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
                <input type="checkbox" name="state" value={check} onClick={onCheckState} checked={check} />
                <span className={`${s.slider} ${s.round}`}></span>
            </label>
        </div>
    );
}

export default CheckState;
