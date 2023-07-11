import React from 'react'
import developers from "./data"
import styles from "./AboutUs.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function AboutUs() {
    console.log(developers);
  return (
    <div style={{margin:"70px 50px",display:"flex", justifyContent:"space-evenly",  flexWrap:"wrap"}}>
        {developers.map((developer, index) => (
            <div className={styles.card} key={index}>
              <div style={{border:"solid 1px green",padding:"20px"}}>
                {/* <img src={developer.image} alt={developer.name} className={styles.img}/> */}
                <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{backgroundImage:`url(${developer.image})`, width:"130px", height:"130px", borderRadius:"50%", backgroundPosition:"center center", backgroundSize:"cover", textAlign:"center"}}></div>
                </div>
                <h3>{developer.name}</h3>
                <h4>{developer.title}</h4>
                <div style={{padding:"10px"}}>
                  <FaLinkedin />
                  <FaGithub />
                </div>
                {/* <p>{developer.role}</p> */}
              </div>
            </div>
        ))}
    </div>
  )
}

export default AboutUs
