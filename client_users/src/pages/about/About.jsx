import styles from "./About.module.css";
import Carousel from "../../components/carouselAbout/Carousel";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.proyect}>  
        <div>
          <h2>Acerca de este proyecto</h2>
          <p>
            Esta aplicacción representa el punto culminante, de nuestro aprendizaje dentro del bootcamp de SOY HENRY, nos permitió aplicar todos los conocimientos adquiridos a lo largo del programa.<br />
            <br />
            Nuestro objetivo era crear un eCommerce web intuitivo y atractivo para amantes del vino, trabajando en colaboración y aprovechando nuestras habilidades individuales para complementarnos como equipo. <br />
            <br />
            Comenzamos definiendo requisitos y creando una sólida estructura para la aplicación. Diseñamos una interfaz atractiva y centrada en la experiencia del usuario. Utilizamos tecnologías como React, Node.js y Express para desarrollar la arquitectura y funcionalidades clave, incluyendo gestión de usuarios, búsqueda y filtrado de vinos, la integración de un sistema de pago seguro para transacciones confiables y protección de datos.
          </p>
        </div>
      </div> 
      <div style={{ width:"40%"}}>
        <Carousel/>
      </div>
    </div>
  );
};

export default About;
