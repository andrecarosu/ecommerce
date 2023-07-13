import React from "react";
import styles from './Login.module.css'
import FormLogin from "../../components/formLogin/FormLogin";
import ButtonBack from "../../components/buttonBack/ButtonBack";

const Login = () => {

  return (
    <div className={styles.container} >
      <div style={{ width: "70%", height:"100vh" }}>
        <img src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1689124462/CarouselHome/shutterstock_119867932_rdax_65_wiompb.jpg" alt="" className={styles.img}/>
      </div>
      <div style={{ width: "30%", height:"100vh" }}>
        <FormLogin />
        <ButtonBack/>
      </div>
    </div>
  );
};

export default Login;
