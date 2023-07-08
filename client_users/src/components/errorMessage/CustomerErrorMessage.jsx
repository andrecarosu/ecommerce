import React from 'react'
import styles from '../errorMessage/CustomerErrorMessage.module.css'

function CustomerErrorMessage({ additionalProp }) {
  return (
    <div className={styles.error}>
      <div>
        <span style={{margin:"5px 0px 12px 0px"}}>{additionalProp}</span>
      </div>
    </div>
  )
}

export default CustomerErrorMessage
