// import { useSelector, useDispatch } from 'react-redux'
// import CardOfert from '../cardOfert/CardOfert';
// import Slider from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useEffect } from 'react';
// import { getAllProducts, getSlider } from '../../redux/actions';

// export default function Carousel({ numSlides, speed }) {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getAllProducts())
//     dispatch(getSlider())
//   }, [dispatch])

//   const { products, slider } = useSelector(state => state)
//   console.log('CAROUSEL', slider);


//   const renderSlides = () => 
//   slider?.map(p => (
//       <CardOfert 
//       key={p.product_id} 
//       product_id={p.product_id} 
//       image={p.image} 
//       name={p.name} 
//       discount={p.discount} 
//       normal_price={p.normal_price}
//       discount_price={p.discount_price}
//       brand={p.brand}
//       Category_product={p.Category_product}
//       />
//     ))
  

//   return (
//     <div style={{marginTop: '50px', padding: '50px'}}>
//       <h1>Mira las ofertas destacadas!</h1>
//       <Slider
//         dots={false}
//         slidesToShow={numSlides || 5}
//         slidesToScroll={1}
//         autoplay={true}
//         autoplaySpeed={speed || 2000}
//       >{renderSlides()}
//       </Slider>
//     </div>
//   );
// }


import { useSelector, useDispatch } from 'react-redux'
import CardOfert from '../cardOfert/CardOfert';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { getAllProducts, getSlider } from '../../redux/actions';
import styles from "./Carousel.module.css";

import { useMediaQuery } from 'react-responsive';

export default function Carousel({ numSlides, speed }) {
  const { products, slider } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(products?.length == 0) dispatch(getAllProducts())
    if(slider.length == 0) dispatch(getSlider())
  }, [dispatch])

  const isMobile = useMediaQuery({ maxWidth: 767 }); // cambiar el ancho máximo según sea necesario
  const slidesToShow = isMobile ? 1 : numSlides || 5; // renderizar 1 tarjeta en pantallas móviles, de lo contrario, use numSlides
  const centerMode = isMobile ? true : false; // centrar el contenido del carrusel en vista mobile


  const renderSlides = () => 
    slider?.map(p => (
      <CardOfert 
        key={p.product_id} 
        product_id={p.product_id} 
        image={p.image} 
        name={p.name} 
        discount={p.discount} 
        normal_price={p.normal_price}
        discount_price={p.discount_price}
        brand={p.brand}
        Category_product={p.Category_product}
      />
    ))

  return (
    <div style={{marginTop: '50px', padding: '50px'}}>
      <h1>Mira las ofertas destacadas!</h1>
      <div className={styles.container}>
      <Slider
        dots={false}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={speed || 2000}
        centerMode={centerMode} // centrar el contenido del carrusel en vista mobile
        arrows={!centerMode} // ocultar las flechas en vista mobile
        variableWidth={false} // asegurarse de que todas las tarjetas tengan el mismo ancho
        cssEase="ease-in-out" // mejorar la transición del carrusel
        centerPadding={isMobile ? "-6px" : "0px"} // agregar relleno a los lados del carrusel para ocultar las tarjetas adyacentes en vista mobile
      >
        {renderSlides()}
      </Slider>
      </div>
    </div>
  );
}
