import React from 'react'
import './CarouselHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';

export default function BtnCarousel({direction, moveSlide}) {
  return (
    <a className={direction === 'next' ? 'btn-carousel1 next1' : 'btn-carousel1 prev1'} onClick={moveSlide}>
        <FontAwesomeIcon icon={direction === 'next' ? faGreaterThan : faLessThan} />
    </a>
  )
}
