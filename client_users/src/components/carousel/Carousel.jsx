import { useSelector, useDispatch } from 'react-redux'
import CardOfert from '../cardOfert/CardOfert';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { getAllProducts, getSlider } from '../../redux/actions';

export default function Carousel({ numSlides, speed }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getSlider())
  }, [dispatch])

  const { products, slider } = useSelector(state => state)
  console.log('CAROUSEL', slider);


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