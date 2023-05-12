import React from "react";
import FormLogin from '../../components/formLogin/FormLogin'
import FondoVerde from "../../assets/images/Fondo3.png"
import Fondo2 from "../../assets/images/Fondo2.png"
import Logo from "../../assets/images/LogoCompleto.png"
import ButtonBack from "../../components/buttonBack/ButtonBack";
import s from './Login.module.css'


const Login = () => {

  const fondo1 = FondoVerde;
  const fondo2 = Fondo2;
  const logo = Logo
  return (
    <div className={s.container}>
      {/* <img className={s.logo} src={logo} alt="texto del logo" /> */}
      <ButtonBack />

      <div className={s.formulario}>
        <FormLogin />
      </div>

      {/* <p style={{ marginTop: '25px', color: 'gray' }}>Al continuar, aceptas las Condiciones de uso y el Aviso de privacidad de JustOffers.</p> */}
    </div>
  );
};

export default Login;
