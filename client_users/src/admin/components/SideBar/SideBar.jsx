import React from 'react';
import s from './SideBar.module.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SideBar = () => {
    const [active, useActive] = useState(0)
    const location = useLocation()

    return (
        <div className={s.sideBarContent}>
            <div className={s.profile}>

            </div>
            <div className={s.menu}>
                <ul>
                    <li>Menu</li>
                    <li className={s.option}>
                        <NavLink to='/dashboard/usuarios' className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            Usuarios
                            {/* <li>Usuarios</li> */}

                        </NavLink>
                    </li>
                    <li className={s.option}>
                        <NavLink to='/dashboard/productos' className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            Productos

                        </NavLink>

                        <div className={`${s.items} 
                        ${location.pathname.includes('/dashboard/productos') ? s.expanded : ''}`}>
                            <NavLink to='/dashboard/productos/categorias'>
                                Categorias</NavLink>
                            <NavLink to=''>Adicional</NavLink>

                        </div>
                    </li>

                    <li className={s.option}>
                        <NavLink to='/dashboard/ventas' className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            Ventas
                        </NavLink>
                    </li>

                </ul>
            </div>


        </div >
    );
}

export default SideBar;
