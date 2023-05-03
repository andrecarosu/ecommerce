import s from "./About.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBullseye, faPercentage, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

const About = () => {
  return (
    <div className={s.container}>
      <div className={s.logo}></div>
      <h1 className={s.titulo}>Acerca de <span style={{ color: 'rgb(213,161,41)' }}>thewinecellar.com</span></h1>
      <div className={s.seccion}>
      <div className={s.paragraph}>
        <p>
          En thewinecellar.com, somos apasionados por el mundo del vino. 
          Nos encanta explorar nuevas variedades, descubrir nuevos sabores y compartir nuestras experiencias 
          con otros amantes del vino como tú.
          {/* <span><FontAwesomeIcon icon={faStar} /></span> */}
        </p>
        </div>
        <div className={s.paragraph}>
        <p>
          Nuestro objetivo es hacer que la compra de vinos en línea sea fácil y accesible para todos 
          aceptando pagos a través de Mercado Pago, ofreciendo una amplia variedad de vinos de alta 
          calidad a precios competitivos.
          {/* <span><FontAwesomeIcon icon={faBullseye} /></span> */}
        </p>
        </div>
      </div>
            <div className={s.seccion}>
            <div className={s.paragraph}>
        <p>
          Pero eso no es todo. En thewinecellar.com, también ofrecemos descuentos exclusivos en muchos
          de nuestros productos, para que puedas disfrutar de los mejores vinos sin tener que gastar
          una fortuna.
          {/* <span><FontAwesomeIcon icon={faPercentage} /></span> */}
        </p>
        </div>
        <div className={s.paragraph}>
        <p >
          Además de nuestra amplia selección de vinos, nuestro equipo de expertos en vinos está siempre
          disponible para ayudarte con cualquier pregunta que puedas tener.
          {/* <span><FontAwesomeIcon icon={faCircleQuestion} /></span> */}
        </p>
        </div>
      </div>
      <div className={s.textEnd}>
      <p >
        Gracias por elegir <span>thewinecellar.com</span> como tu tienda de vinos en línea. 
        Esperamos que disfrutes de nuestros productos tanto como nosotros disfrutamos 
        compartiéndolos contigo.
      </p>
      </div>      
    </div>
  );
};

export default About;
