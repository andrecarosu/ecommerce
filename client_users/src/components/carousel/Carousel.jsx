import { useSelector, useDispatch } from 'react-redux'
import CardOfert from '../cardOfert/CardOfert';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { getAllProducts } from '../../redux/actions';

export default function Carousel({ numSlides, speed }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const products = useSelector(state => state.products)
  console.log('CAROUSEL', products);


  const renderSlides = () => 
    products?.map(p => (
      <CardOfert key={p.id_producto} id={p.id_producto} imagen={p.imagen} nombre={p.nombre} valor_normal={p.valor_normal} valor_con_descuento={p.valor_con_descuento} />
    ))
  

  return (
    <div style={{marginTop: '50px', padding: '50px'}}>
      <h1>Mira las ofertas destacadas!</h1>
      <Slider
        dots={false}
        slidesToShow={numSlides || 5}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={speed || 2000}
      >{renderSlides()}
      </Slider>
    </div>
  );
}