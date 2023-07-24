import React, {useState, useEffect} from 'react'
import dataCarousel from './data';
import BtnCarousel from './btnCarousel';
import './CarouselHome.css'


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
    <div className='container1'>
        {dataCarousel.map((data, index) => {
            return(
              <div key={index} className={slideIndex === index + 1 ? "section1 active-anim1" : "section1"}>
                  <img src={data.src} className={slideIndex === index + 1 ? 'img-actual1' : ''} />
                  <div className='texts1'>
                    <h2>{data.title}</h2>
                    <p>{data.caption}</p>
                  </div>
              </div>
            )
        })}

        <BtnCarousel moveSlide={nextSlide} direction={"next"} />
        <BtnCarousel moveSlide={prevSlide} direction={"prev"} />

        <div className='container-dots1'>
          {Array.from({length:dataCarousel.length}).map((item, index) => (
            <div key={index} className={slideIndex === index + 1 ? 'dot1 active1' : 'dot1'} onClick={() => moveDot(index + 1)}></div>
          ))}
        </div>
    </div>
  )
}
