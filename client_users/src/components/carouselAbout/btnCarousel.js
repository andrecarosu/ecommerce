import React from 'react'
import './Carousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';

export default function BtnCarousel({direction, moveSlide}) {
  // {console.log(direction)}
  return (
    <a className={direction === 'next' ? 'btn-carousel next' : 'btn-carousel prev'} onClick={() => {moveSlide();console.log(direction,moveSlide)}}>
        <FontAwesomeIcon icon={direction === 'next' ? faGreaterThan : faLessThan} />
    </a>
  )
}
