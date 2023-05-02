import FormRegister from '../../components/formRegister/FormRegister'
import Logo from "../../assets/images/LogoCompleto.png"

import s from "./Register.module.css"

export default function Register() {
    const logo = Logo

    return (
        <div className={s.container}>
            {/* <img className={s.logo} src={logo} alt="texto del logo" /> */}
            <p style={{padding: '15px', marginBottom: '20px', color: 'gray'}}>Por favor completa la información sobre ti para registrar tu cuenta, <br /> y comenzar a aprovechar nuestras ofertas exclusivas!</p>
            <FormRegister />
        </div>
    )
}