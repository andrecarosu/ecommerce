import React from "react";
import CardsCategory from "../../components/cardsCategory/CardsCategory";
import Carousel from "../../components/carousel/Carousel";
import CarouselHome from '../../components/carouselHome/Carousel'

function HomePrincipal() {

  return (
    <div style={{ minHeight: '100vh'}}>
      <CarouselHome></CarouselHome>
      <Carousel numSlides={5} speed={2000} />
      <hr style={{ width: '85%', margin: '20px auto' }} />
      <div>
        <h1 style={{ textAlign: 'left', marginLeft: '80px' }}>Explora por varietales</h1>
        <CardsCategory />
      </div>
    </div>
  );
}

export default HomePrincipal;
