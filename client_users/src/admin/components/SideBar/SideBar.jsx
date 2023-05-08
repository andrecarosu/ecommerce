import React from 'react';
import s from './SideBar.module.css'
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faWineGlass, faFileLines } from "@fortawesome/free-solid-svg-icons";
import UserIcon from '../userIcon/UserIcon';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Profile from '../Profile/Profile';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../../redux/actions';


const SideBar = () => {
    const [active, useActive] = useState(0)
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    const onClicklLogout = async () => {
        window.localStorage.removeItem("estaLogueado");
        window.localStorage.removeItem('carrito');
        window.localStorage.removeItem('count');
        Cookies.remove('user_token')
        Cookies.remove('user_session')
        await dispatch(userLoggedIn(false));
        history.push('/')

    }

    return (
        <div className={s.sideBarContent}>
            <div className={s.profile}>
                <Profile />
                {/* <UserIcon /> */}
            </div>
            <div className={s.menu}>
                <ul>
                    <li className={s.option}>
                        <NavLink to='/dashboard/' exact className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            <FontAwesomeIcon icon={faHouse} /> Menu
                            {/* <li>Usuarios</li> */}

                        </NavLink>
                    </li>

                    <li className={s.option}>
                        <NavLink to='/dashboard/usuarios' exact className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            <FontAwesomeIcon icon={faUser} /> Usuarios
                            {/* <li>Usuarios</li> */}

                        </NavLink>
                    </li>
                    <li className={s.option}>
                        <NavLink to='/dashboard/productos' exact className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            <FontAwesomeIcon icon={faWineGlass} /> Productos

                        </NavLink>

                        <div className={`${s.items} 
                        ${location.pathname.includes('/dashboard/productos') ? s.expanded : ''}`} style={{ '--d': '2' }}>
                            <NavLink to='/dashboard/productos/categorias'>
                                Categorias</NavLink>
                            <NavLink to='/dashboard/productos/ver-calificaciones'>Ver Calificaciones</NavLink>

                        </div>
                    </li>

                    <li className={s.option}>
                        <NavLink to='/dashboard/ventas' exact className={isActive =>
                            `${s.a} ${(isActive ? s.current : '')}`}>
                            <FontAwesomeIcon icon={faFileLines} /> Ventas
                        </NavLink>
                    </li>

                </ul>
            </div>
            <button onClick={onClicklLogout} className={s.logout}>Cerrar sesion</button>


        </div >
    );
}

export default SideBar;
