import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsuarioByEmail } from "../../redux/actions";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import FormUpdate from "../../components/FormUpdate/FormUpdate";
import FormUpdatePassword from "../../components/FormUpdate/FormUpdatePassword";

import s from "./Account.module.css";

const AccountDatabase = () => {
  /* ------------------- ESTADOS ------------------- */
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario) ?? [];

  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;
  console.log(14, email);
  const emailDatas = email
    
  
  useEffect(() => {
    dispatch(getUsuarioByEmail(email));
  }, [dispatch, email]);

  // Actualizar el estado local con los datos del usuario
  useEffect(() => {
    if (usuario.length > 0) {
      setUserData(usuario[0]);
    }
  }, [usuario]);


  /* ------------- MENU HAMBURGUESA ------------- */

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogInClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowProfileMenu(!showProfileMenu);
  };

  const idUsuario = usuario.length > 0 ? usuario[0].user_id : null;


  const nombreUsuario = userData?.name;



  return (
    <div className={s.container}>

      <div className={s.usuario}>
        <h1 style={{ marginBottom: '15px', textAlign: 'left', fontSize: '30px' }}>Mi cuenta</h1>
        <div className={s.datos}>
          <div style={{ backgroundImage: `url(${userData.image})` }} className={s.imagen}></div>

          <span className={s.label}>Nombre</span>
          <h3 className={s.dato_nombre}>{nombreUsuario}</h3>

          <span className={s.label}>Email</span>
          <h3 className={s.dato}>{userData.email}</h3>

          <span className={s.label}>Ciudad</span>
          <h3 className={s.dato}>{userData.city}</h3>

          <span className={s.label}>Dirección</span>
          <h3 className={s.dato}>{userData.address}</h3>

          <span className={s.label}>Teléfono</span>
          <h3 className={s.dato}>{userData.phone}</h3>
        </div>

      </div>

      <div className={s.update}>
        <FormUpdate idUsuario={idUsuario} />
        <button onClick={handleLogInClick}>Quiero cambiar mi contraseña</button>
        {showProfileMenu && <FormUpdatePassword idUsuario={idUsuario} emailResult={userData.email} mostrarProp={true} />}
      </div>
    </div>
  );
};



export default AccountDatabase;
