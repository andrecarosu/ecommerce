import React from "react";
import Cookies from "js-cookie";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import s from "./Account.module.css";

const AccountGoogle = () => {
 

    const email = Cookies.get("user_session");
    console.log(35,email);  

  return (
    <div className={s.container}>

      <div className={s.usuario}>
        <h1 style={{ marginBottom: '15px', textAlign: 'left', fontSize: '30px' }}>Mi cuenta</h1>
        <div className={s.datos}>
          <img icon={faUser} style={{ color: "white", cursor:"pointer", fontSize:"30px"}} className={s.imagen}/>

          <span className={s.label}>Nombre</span>
          <h3 className={s.dato_nombre}>Usuario Google</h3>

          <span className={s.label}>Email</span>
          <h3 className={s.dato}>{email}</h3>

         
        </div>

      </div>

      
    </div>
  );
};



export default AccountGoogle;
