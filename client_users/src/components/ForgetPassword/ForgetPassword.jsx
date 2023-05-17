import React, { useState } from 'react';
import s from './ForgetPassword.module.css'
import axios from "axios"
import swal from 'sweetalert';

const ForgetPassword = ({ setActiveForget }) => {
    const [input, setInput] = useState('')
    const url = process.env.REACT_APP_DEPLOYBACK_URL

    const onChangeInput = (e) => {
        const { value } = e.target
        setInput(value)
    }

    const onClose = () => {
        setActiveForget(false)
    }

    const onClickReset = async () => {
        await axios.put(`${url}/usuario/reset-password`, { email: input })
            .then((data) => {
                console.log('here', data.data)
                setActiveForget(false)
                swal({
                    title: "Peticion exitosa",
                    text: "Se le envio la contraseña de restauracion al correo",
                    icon: "success",
                    timer: "3000",
                });
            })
            .catch((err) => {
                console.log('este es el error', err)
                setActiveForget(false)
                swal({
                    text: "Error",
                    text: err.response.data,
                    icon: "error",
                    timer: "5000",
                    button: "Accept",
                });
            })
    }

    return (
        <div onClick={onClose} className={s.gloablContainerTran}>
            <div className={s.emailContainer} onClick={(e) => e.stopPropagation()}>
                <label onClick={onClose} className={s.close}>X</label>
                <label>Ingrese el correo de contacto para reestablecer la contraseña</label>
                <label>Email *</label>
                <input
                    name="email"
                    value={input}
                    onChange={onChangeInput}

                />
                <button onClick={onClickReset}>Enviar</button>
            </div>
        </div>
    );
}

export default ForgetPassword;
