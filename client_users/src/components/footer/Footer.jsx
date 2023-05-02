import styles from "../footer/Footer.module.css"
import Logo from "../../assets/images/LogoCompletoBlanco.png"
import Henry from "../../assets/images/HenryLogo.png"

const Footer = () => {
const logo = Logo
const henry = Henry
    return(
        <div style={{minHeight: "100%", position: "relative", height:"100%"}}>
            <div className={styles.container}>

            <div className={styles.nombres}>
  <p className={styles.nombres}>Recibimos meidos de pagos:</p>
  <label className={styles.nombres}>  <img className={styles.henry} src="https://www.cast.mx/MercadoPago/imagenes/Ahora-aceptamos-MercadoPago-Pago-con-Tarjeta-de-Credito-Debito-y-Saldo-de-MercadoLibre-CASTelecom.png" />
</label>  
</div>
<div className={styles.nombres}>
  <label className={styles.nombres}>Horarios de Atención:</label>
  <label className={styles.nombres}>Lunes a Sábado</label>
  <br />
  <label>10:00 a.m - 12:00 p.m</label>
</div>

                <div >
                <a href="https://www.facebook.com/profile.php?id=100092554111303" target="_blank">
  <img className={styles.facebook} src="https://img.freepik.com/psd-gratis/cuadrado-redondeado-3d-logo-facebook-brillante_125540-1538.jpg?size=626&ext=jpg&ga=GA1.2.1515287885.1677413274&semt=robertav1_2_sidr" />
</a>

                </div>
            </div>
        </div>
    )
}

export default Footer