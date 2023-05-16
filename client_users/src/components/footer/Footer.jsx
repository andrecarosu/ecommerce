import Logo from "../../assets/images/LogoFooter.png"
import MetodosPago from '../../assets/images/MetodosDePago.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faLocationDot, faEnvelope, faPhone, faClock, faCalendar, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'

const Footer = () => {
    return(
      <footer>
        <div className="container-footer">
          <section className="logo" >
            <div><img src={Logo} alt="" style={{border: "solid 1px rgb(213,161,41)", borderRadius:"3px"}}/></div>
            {/* <div className="redes">
              <a href="https://www.facebook.com" target="_blank">
                <svg fill="#D5A129" width="32" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <svg width="32" height="30" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#D5A129" stroke-width="12" d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z"/><circle cx="96" cy="96" r="30" stroke="#D5A129" stroke-width="12"/><circle cx="135" cy="57" r="9" fill="#D5A129"/></svg>
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <svg fill="#D5A129" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="28" height="25"
                    viewBox="0 0 31.812 26">
                    <path d="M20.877,2.000 C22.519,2.000 24.382,2.652 25.426,3.738 C26.724,3.486 27.949,3.025 29.050,2.386 C28.625,3.687 27.718,4.779 26.540,5.469 C27.693,5.332 28.797,5.035 29.820,4.590 C29.054,5.707 28.087,6.690 26.971,7.477 C26.981,7.715 26.987,7.955 26.987,8.195 C26.987,15.562 21.445,24.000 10.939,24.000 C7.715,24.000 4.507,23.133 1.982,21.551 C2.428,21.605 2.883,21.631 3.343,21.631 C6.019,21.631 8.482,20.740 10.439,19.242 C7.937,19.199 5.827,17.586 5.103,15.373 C5.450,15.437 5.810,15.473 6.178,15.473 C6.696,15.473 7.203,15.406 7.681,15.277 C5.068,14.768 3.100,12.514 3.100,9.813 C3.100,9.787 3.100,9.764 3.100,9.740 C3.871,10.158 4.750,10.410 5.687,10.440 C4.154,9.437 3.147,7.734 3.147,5.799 C3.147,4.777 3.428,3.818 3.919,2.998 C6.735,6.367 10.945,8.588 15.693,8.822 C15.594,8.414 15.543,7.984 15.543,7.553 C15.543,4.473 17.721,2.000 20.877,2.000 M29.820,4.590 L29.825,4.590 M20.877,-0.000 C17.033,-0.000 14.060,2.753 13.614,6.552 C10.425,5.905 7.524,4.204 5.440,1.711 C5.061,1.257 4.503,0.998 3.919,0.998 C3.867,0.998 3.815,1.000 3.763,1.004 C3.123,1.055 2.547,1.413 2.216,1.966 C1.525,3.122 1.159,4.447 1.159,5.799 C1.159,6.700 1.321,7.579 1.625,8.400 C1.300,8.762 1.113,9.238 1.113,9.740 L1.113,9.813 C1.113,11.772 1.882,13.589 3.160,14.952 C3.087,15.294 3.103,15.655 3.215,15.998 C3.657,17.348 4.459,18.510 5.499,19.396 C4.800,19.552 4.079,19.631 3.343,19.631 C2.954,19.631 2.577,19.609 2.222,19.565 C2.141,19.556 2.061,19.551 1.981,19.551 C1.148,19.551 0.391,20.078 0.108,20.886 C-0.202,21.770 0.140,22.753 0.932,23.249 C3.764,25.023 7.318,26.000 10.939,26.000 C17.778,26.000 22.025,22.843 24.383,20.195 C27.243,16.984 28.907,12.718 28.972,8.455 C29.899,7.682 30.717,6.790 31.410,5.792 C31.661,5.458 31.810,5.041 31.810,4.590 C31.810,3.909 31.473,3.308 30.958,2.946 C31.181,2.176 30.925,1.342 30.303,0.833 C29.940,0.537 29.496,0.386 29.049,0.386 C28.708,0.386 28.365,0.474 28.056,0.654 C27.391,1.040 26.680,1.344 25.931,1.562 C24.555,0.592 22.688,-0.000 20.877,-0.000 L20.877,-0.000 Z"/>
                </svg>
              </a>
            </div> */}
          </section>
          <section className="information">
            <h3>
              <FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon> UBICACIÓN
            </h3>
            <p>
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Carrera 6 #67-63
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> contact@thewinecellar.com
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