import s from "./About.module.css";

const About = () => {
  return (
    <div className={s.container}>
      <div className={s.logo}></div>
      <h1 className={s.titulo}>¿Qué es Just<span style={{ color: 'var(--green-color)' }}>Offers</span>?</h1>
      <p>
        Bienvenidos a JustOffers, el marketplace donde las PYMES pueden llegar
        a más clientes a través de ofertas y promociones, mientras que los
        compradores pueden encontrar grandes ofertas en una variedad de
        productos y servicios. En JustOffers, creemos que todas las empresas
        merecen la oportunidad de expandirse y llegar a nuevos mercados, y que
        los compradores merecen acceso a los mejores precios y ofertas
        disponibles.
        <br></br>
        <br></br>
        Fundada el 27 de abril del 2023, nuestra plataforma se ha convertido
        en una fuente confiable para PYMES y compradores por igual. Para los
        compradores, ofrecemos una amplia variedad de ofertas y promociones en
        una variedad de categorías, desde electrónica hasta servicios locales
        y todo lo demás. Nuestra plataforma es fácil de usar y navegar, lo que
        permite a los compradores encontrar y comprar ofertas en cuestión de
        minutos.
        <br></br>
        <br></br>
        En JustOffers, nos enorgullece nuestro compromiso con la calidad, la
        transparencia y la justicia en todos los aspectos de nuestro negocio.
        <br></br>
        <br></br>
        Trabajamos arduamente para garantizar que nuestros usuarios obtengan
        el mejor valor posible por su dinero, mientras que nuestras PYMES
        colaboradoras tienen la oportunidad de expandirse y crecer. Únete a la
        comunidad de JustOffers hoy y descubre cómo podemos ayudarte a
        encontrar las mejores ofertas y apoyar a las PYMES locales.
      </p>
    </div>
  );
};

export default About;
