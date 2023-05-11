import React, {useState, useEffect} from 'react'
import './Carousel.css'
import dataCarousel from './data';
import BtnCarousel from './btnCarousel';


export default function Carousel() {
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if(slideIndex !== dataCarousel.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === dataCarousel.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(dataCarousel.length)
    }
  }

  const moveDot = index => {
    setSlideIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() =>{
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  })

  return (
    <div className='container-carousel'>
        {dataCarousel.map((data, index) => {
            return(
              <div key={index} className={slideIndex === index + 1 ? "section active-anim" : "section"}>
                  <img src={data.src} className={slideIndex === index + 1 ? 'img-actual' : ''} />
                  <div className='texts'>
                    <h2>{data.title}</h2>
                    <p>{data.caption}</p>
                  </div>
              </div>
            )
        })}

        <BtnCarousel moveSlide={nextSlide} direction={"next"} />
        <BtnCarousel moveSlide={prevSlide} direction={"prev"} />

        <div className='container-dots'>
          {Array.from({length:dataCarousel.length}).map((item, index) => (
            <div key={index} className={slideIndex === index + 1 ? 'dot active' : 'dot'} onClick={() => moveDot(index + 1)}></div>
          ))}
        </div>
    </div>
  )
}
