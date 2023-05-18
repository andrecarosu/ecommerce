import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import s from "./Account.module.css";
import axios from "axios";
import FormUpdateGoogle from "../../components/formUpdateGoogle/FormUpdateGoogle"

const AccountGoogle = () => {
  const url = process.env.REACT_APP_DEPLOYBACK_URL
  const [dataUsuario, setDataUsuario] = useState({});
    const email = Cookies.get("user_session");
    console.log(35,email);  


    useEffect(async () => {
      await axios
      .get(`${url}/perfil?email=${email}`)
      .then((res) => {
        console.log(123,res.data);
        if (res.data.length > 0) {
          setDataUsuario(res.data[0])
        }
      })
      .catch((err) => console.log(err));
      
    }, [email, setDataUsuario])

  return (
    <div className={s.container}>

      <div className={s.usuario}>
        <h1 style={{ marginBottom: '15px', textAlign: 'left', fontSize: '30px' }}>Mi cuenta</h1>
        <div className={s.datos}>
        <div style={{ backgroundImage: `url(${dataUsuario.image})` }} className={s.imagen}></div>

          <span className={s.label}>Nombre</span>
          <h3 className={s.dato_nombre}>Usuario: {dataUsuario.name}</h3>

          <span className={s.label}>Email</span>
          <h3 className={s.dato}>{email}</h3>
          <span className={s.label}>Ciudad</span>
          <h3 className={s.dato}>{dataUsuario.city}</h3>

          <span className={s.label}>Dirección</span>
          <h3 className={s.dato}>{dataUsuario.address}</h3>

          <span className={s.label}>Teléfono</span>
          <h3 className={s.dato}>{dataUsuario.phone}</h3> 

         
        </div>

      </div>
      <div className={s.update}>
        <FormUpdateGoogle email={email} />
      </div>
      
    </div>
  );
};



export default AccountGoogle;
