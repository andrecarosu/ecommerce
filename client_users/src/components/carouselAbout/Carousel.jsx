import React, {useState, useEffect} from 'react'
// import './CarouselA.css'
import dataCarousel from './developers';
import BtnCarousel from './btnCarousel';
import { FaLinkedin, FaGithub } from 'react-icons/fa';



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
    }, 3000)

    return () => clearInterval(interval)
  }, [slideIndex])

  const handlerLink = (url) => {
    window.open(url, '_blank')
  }

    return (
      <div className='container-carousel'>
          {dataCarousel.map((data, index) => {
              return(
                <div key={index} className={slideIndex === index + 1 ? "section active-anim" : "section"}>
                    <img src={data.image} alt={data.name} className={slideIndex === index + 1 ? 'img-actual' : ''} />
                    <div className='texts'>
                      <h2>{data.name}</h2>
                      <p>{data.title}</p>
                      <div style={{display:"flex", padding:"10px"}}>
                        {console.log(dataCarousel[slideIndex-1])}
                        <a 
                          className='linkendin' 
                          href={slideIndex === index + 1 ? data.linkendin :`${dataCarousel[slideIndex-1].linkendin}`}
                          target="_blank"
                          rel="noopener noreferrer" >
                            <FaLinkedin />
                        </a>
                        <a 
                          className='github' 
                          href={slideIndex === index + 1 ? data.github :`${dataCarousel[slideIndex-1].github}`}
                          target="_blank"
                          rel="noopener noreferrer" >
                            <FaGithub />
                        </a>
                      </div>
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
