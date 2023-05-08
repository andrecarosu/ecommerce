import React, { useState } from 'react'
import s from './Pagination.module.css'

const Pagination = ({ NextPage, PreviousPage, totalPages, currentPage }) => {
  const [index, setIndex] = useState(1)

  const handleSkip = () => {
    NextPage()
    setIndex(index + 1)
  }

  const handleBack = () => {
    PreviousPage()
    setIndex(index - 1)
  }
  return (
    <div className={s.containerButtons}>
      <button className={''}
        onClick={handleBack}
      >
        Ant.
      </button>
      <span>
        {currentPage + 1} de {totalPages}
      </span>
      <button
        className={''}
        onClick={handleSkip}
      >
        Sig.
      </button>
    </div>
  )
}

export default Pagination
