import s from "./About.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBullseye, faPercentage, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import Carousel from '../../components/carouselAbout/Carousel'

const About = () => {
  return (
    <div className={s.container}>
      {/* <div className={s.logo}></div> */}
      {/* <h1 className={s.titulo}>Acerca de <span style={{ color: 'rgb(213,161,41)' }}>thewinecellar.com</span></h1> */}
      <Carousel />
          
    </div>
  );
};

export default About;
