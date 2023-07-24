import React from 'react'
import styles from '../errorMessage/CustomerErrorMessage.module.css'

function CustomerErrorMessage({ additionalProp }) {
  return (
    <div className={styles.error}>
      <span className={styles.text}>{additionalProp}</span>
    </div>
  )
}

export default CustomerErrorMessage
