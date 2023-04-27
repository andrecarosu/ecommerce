import styles from "../footer/Footer.module.css"
import Logo from "../../assets/images/LogoCompletoBlanco.png"
import Henry from "../../assets/images/HenryLogo.png"

const Footer = () => {
const logo = Logo
const henry = Henry
    return(
        <div style={{minHeight: "100%", position: "relative", height:"100%"}}>
            <div className={styles.container}>
                <div>
                    <img className={styles.logo} src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1681994536/LogoCompletoBlanco_cxbcjm.png" />
                </div>
                <div className={styles.nombres}>
                <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/udiz/"
                    target="_blank"
                    rel="noreferrer">
                        Jesus Udiz
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/andrea-carolina-su%C3%A1rez-mesa-460861b9/"
                    target="_blank"
                    rel="noreferrer">
                        Andrea Carolina Suárez Mesa
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/rodrigo-duran-74514a269/"
                    target="_blank"
                    rel="noreferrer">
                        Rodrigo Duran
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/mateo-mugnaini/"
                    target="_blank"
                    rel="noreferrer">
                        Franco Galeano
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/corvalautaro/"
                    target="_blank"
                    rel="noreferrer">
                        Lautaro Corva
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/mateo-mugnaini/"
                    target="_blank"
                    rel="noreferrer">
                        Chris Ringler
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/jonathan-pomilio-b0456a187/"
                    target="_blank"
                    rel="noreferrer">
                        Jonathan Pomilio
                    </a>
                    <a
                    className= {styles.links}
                    href="https://www.linkedin.com/in/mateo-mugnaini/"
                    target="_blank"
                    rel="noreferrer">
                        Mugnaini Mateo
                    </a>
                </div>
                <div >
                    <img className={styles.henry} src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1681994535/HenryLogo_oevjn5.png" />
                </div>
            </div>
        </div>
    )
}

export default Footer