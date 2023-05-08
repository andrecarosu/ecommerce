import React from 'react'
import './Carousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default function BtnCarousel({direction, moveSlide}) {
  return (
    <a className={direction === 'next' ? 'btn-carousel next' : 'btn-carousel prev'} onClick={moveSlide}>
        <FontAwesomeIcon icon={direction === 'next' ? faArrowAltCircleRight : faArrowAltCircleLeft} />
    </a>
  )
}
