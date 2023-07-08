import React, { useEffect, useState } from 'react'
import "./ProgressBar.css"

function ProgressBar({ currentStep, totalSteps }) {
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;
    const stepLabels = ['Datos Personales', 'Datos de contacto', 'Datos de la cuenta'];
 return (
  <div>
    <div style={{display:"flex", justifyContent:"center"}}>
      <div className="progress-bar" style={{width:"75%"}}>
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
        <div className="progress-bar__steps">
          {[...Array(totalSteps)].map((_, index) => (
            <div>
                <div
                key={index}
                className={`progress-bar__step ${index + 1 <= currentStep ? 'active' : ''}`}
                >
                {index + 1}
                </div>
            </div>
                ))}
        </div>
      </div>
    </div>
    <div style={{ display:"flex", justifyContent:"space-evenly", marginTop:"20px"}}>
      { stepLabels.map((label, index) => (
              <span
                key={index}
              >
                {label}
              </span>
            )
          )}
      </div>
   </div>
 );
}

export default ProgressBar
