import React from "react";
import styles from './Login.module.css'
import FormLogin from "../../components/formLogin/FormLogin";
import ButtonBack from "../../components/buttonBack/ButtonBack";

const Login = () => {

  return (
    <div className={styles.container} >
      <div style={{ width: "70%", height:"100vh" }}>
        <img src="https://s1.1zoom.me/big0/625/Wine_Colored_background_Stemware_Bottle_525370_1280x912.jpg" alt="" className={styles.img}/>
      </div>
      <div style={{ width: "30%", height:"100vh" }}>
        <FormLogin />
        <ButtonBack/>
      </div>
    </div>
  );
};

export default Login;
