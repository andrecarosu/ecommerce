import FormRegister from '../../components/formRegister/FormRegister'
import Logo from "../../assets/images/LogoCompleto.png"

import s from "./Register.module.css"

export default function Register() {
    const logo = Logo

    return (
        <div className={s.container}>
            <div style={{width:"60%", }}>
                <img src="https://cdn.shopify.com/s/files/1/0577/5550/0600/articles/los-beneficios-vinos-sin-alcohol.jpg?v=1674154866" alt="" style={{width:"100%", height:"100%"}}/>
            </div>
            <div style={{width:"40%", height:"90vh", backgroundColor:"#f6f6f6"}}>
                <FormRegister />
            </div>
        </div>
    )
}