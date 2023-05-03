import s from "./About.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBullseye, faPercentage, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import PersonaUno from '../../assets/images/EquipoPersonaUno.jpg';

const About = () => {
  return (
    <div className={s.container}>
      <div className={s.logo}></div>
      <div className={s.acerca}>
        <h2 className={s.titulo}>Acerca de <span style={{ color: 'var(--green-color)' }}>JustOffers</span></h2> 
        <div className={s.seccionAcerca}>
          <p>
            En JustOffers, somos apasionados por el mundo del vino. 
            Nos encanta explorar nuevas variedades, descubrir nuevos sabores y compartir nuestras experiencias 
            con otros amantes del vino como tú.
            <span><FontAwesomeIcon icon={faStar} /></span>
          </p>
          <p>
            Nuestro objetivo es hacer que la compra de vinos en línea sea fácil y accesible para todos 
            aceptando pagos a través de Mercado Pago, ofreciendo una amplia variedad de vinos de alta 
            calidad a precios competitivos.
            <span><FontAwesomeIcon icon={faBullseye} /></span>
          </p>
        </div>
        <div className={s.seccionAcerca}>
          <p>
            Pero eso no es todo. En JustOffers, también ofrecemos descuentos exclusivos en muchos
            de nuestros productos, para que puedas disfrutar de los mejores vinos sin tener que gastar
            una fortuna.
            <span><FontAwesomeIcon icon={faPercentage} /></span>
          </p>
          <p>
            Además de nuestra amplia selección de vinos, nuestro equipo de expertos en vinos está siempre
            disponible para ayudarte con cualquier pregunta que puedas tener.
            <span><FontAwesomeIcon icon={faCircleQuestion} /></span>
          </p>
        </div>
        <p className={s.textEnd}>
          Gracias por elegir <span>JustOffers</span> como tu tienda de vinos en línea. 
          Esperamos que disfrutes de nuestros productos tanto como nosotros disfrutamos 
          compartiéndolos contigo.
        </p>
      </div>
      <div className={s.equipo}>
        <h2 className={s.titulo}>Nuestro <span style={{ color: 'var(--green-color)' }}>Equipo</span></h2> 
        <div className={s.seccionEquipo}>
          <div className={s.personalEquipo}>
            <div className={s.personalImg}>
              <img src={PersonaUno} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
