import { useState } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'react-modern-drawer'
import "react-modern-drawer/dist/index.css";
import IconMenu from './IconMenu'
import { AiOutlineShoppingCart } from "react-icons/ai";
import s from './drawer.module.css'

export default function DrawerMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <div onClick={toggleDrawer} style={{ cursor: 'pointer' }}> <IconMenu /> </div>

            <Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
                <div className={s.container}>
                    <div>
                        <h1>thewinecellar.com</h1>
                    </div>
                    <div>
                        <Link to="/" className='link-no-decoration'>
                            <h4 style={{ color: 'black' }}>Inicio</h4>
                        </Link>
                        <Link to="/log-in" className='link-no-decoration'>
                            <h4 style={{ color: 'black' }}>Iniciar sesión</h4>
                        </Link>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <AiOutlineShoppingCart size={35} />
                            <Link to="/shopping-cart" className='link-no-decoration'>
                                <h4 style={{ color: 'black' }}>Mi carrito</h4>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/about" className='link-no-decoration' >
                            <h4 style={{ color: 'black' }}>Contactanos</h4>
                        </Link>
                        <Link to="/about" className='link-no-decoration' >
                            <span style={{ color: 'black' }}>¿Quienes somos?</span>
                        </Link>
                    </div>
                </div>
            </Drawer>
        </>
    )
}