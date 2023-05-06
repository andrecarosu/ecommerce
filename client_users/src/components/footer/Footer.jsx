import Logo from "../../assets/images/LogoCompletoBlanco.png"
import Henry from "../../assets/images/HenryLogo.png"
import MetodosPago from '../../assets/images/MetodosDePago.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faLocationDot, faEnvelope, faPhone, faClock, faCalendar, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'

const Footer = () => {
    return(
      <footer>
        <div className="container-footer">
          <section className="logo">
            <img src={Logo} alt="" />
            <div className="redes">
              <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"/>
              </svg>
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" fill="#000000"/>
              </svg>
            </div>
          </section>
          <section className="information">
            <h3>
              <FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon> UBICACIÓN
            </h3>
            <p>
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Carrera 6 #67-63
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> contact@thewincellar.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> +57 321 303 7885
            </p>
          </section>
          <section className="horaries">
            <h3>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> HORARIOS
            </h3>
            <p>
              <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Lunes a Domingo
            </p>
            <p>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 10 am a 12 am
            </p>
          </section>
          <section className="payments">
            <h3>
              <FontAwesomeIcon icon={faMoneyBill1Wave}></FontAwesomeIcon> MÉTODOS DE PAGO
            </h3>
            <img src={MetodosPago} alt="" />
          </section>
        </div>
      </footer>
    )
}

export default Footer