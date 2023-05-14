import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import DrawerMenu from "../drawerMenu/DrawerMenu";
import s from "./NavBar.module.css";
import Cookies from 'js-cookie';
import { userLoggedIn } from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/images/LogoHeader.png';


// imagenes
import logIn from "../../assets/images/logIn.webp";
import { useEffect } from "react";

const NavBar = () => {
  
  /* ------------- MENU HAMBURGUESA ------------- */

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogInClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  // const handleMouseLeave = () => {
  //   setShowProfileMenu()
  // }

  const location = useLocation()

  useEffect(() => {
    setShowProfileMenu(false)
  }, [location.pathname])

  /* ------------- LOGIN MENU ------------- */

  // const estaLogueado = useSelector(state => state.logIn)

  // Obtén el valor almacenado en el localStorage
  // const session = Cookies.get("user_session");
  //   let values = JSON.parse(session)
  //   let userCookie = values.dataValues
  //   console.log(userCookie);
  const estaLogueado = localStorage.getItem("estaLogueado");

  /* ------------- LOGOUT ------------- */
  const dispatch = useDispatch();
  const logOut = false;

  // const handleLogOut = () => {
  //   dispatch(userLoggedIn(logOut))
  // };

  const handleLogOut = () => {
    // Elimina el estado de inicio de sesión del almacenamiento local del navegador
    window.localStorage.removeItem("estaLogueado");
    window.localStorage.removeItem('carrito');
    window.localStorage.removeItem('count');
    Cookies.remove('user_token')
    Cookies.remove('user_session')
    dispatch(userLoggedIn(logOut));
  };
  /* ------------- LOGOUT ------------- */

  const count = useSelector(state => state.countCarrito)

  return (
    <div className={s.container}>
      <div className={s.menu}>
        <DrawerMenu />
      </div>

      {/* <div className={s.options}>
        <Link to={"/"}>
          <img className={s.texto} src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1681994537/SoloTextoBlanco_iraxjq.png" />
          <img className={s.icono} src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1681994537/SoloIconoNormal_bjxj2j.png"/>
        </Link>
      </div> */}
      <div className={s.nav_text}>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>

        <Link
          to="/"
          className={s.link}
        >
          <h4>Inicio</h4>
        </Link>

        <Link
          to="/about"
          className={s.link}
        // style={{ margin: '0px 10px' }}
        >
          <h4>¿Quienes somos?</h4>
        </Link>

        <Link
          to="/product"
          className={s.link}
        // style={{ margin: '0px 10px' }}
        >
          <h4>Productos</h4>
        </Link>

      </div>

      <div className={s.box1}>
        <SearchBar />
      </div>

      <div className={s.sesion}>
        {!estaLogueado && (
          <Link to="/log-in" className={s.link}>
            <h4>Iniciar sesión</h4>
          </Link>

        )}

        {estaLogueado === "database" && (
          <div 
            style={{ height:"61px", display:"flex", alignItems:"center" }}
            onMouseLeave={() => setShowProfileMenu(false)} 
            onMouseEnter={() => setShowProfileMenu(true)}>
            <FontAwesomeIcon icon={faUser} style={{ color: "white", cursor:"pointer", fontSize:"30px"}}  />
            {/* <h5 style={{ color:"white"}}>Hola {userCookie.name}</h5> */}
            {showProfileMenu && (
              <div className={s.menuDesplegable}>

                <Link to="/account" className={s.link_menu} onClick={handleLogInClick} >
                  <h4>Ver perfil</h4>
                </Link>
                <Link to="/historial-de-compra" className={s.link_menu} onClick={handleLogInClick}>
                  <h4>Historial de compras</h4>
                </Link>
                <Link to="/" className={s.link_menu} onClick={handleLogOut}>
                  <h4>Cerrar sesión</h4>
                </Link>
              </div>
            )}
          </div>
        )}


        {estaLogueado === "google" && (
          <div style={{ display: 'flex' }}>
            {/* <img onClick={handleLogInClick} className={s.logIn} src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1681994536/profile_j9qoip.png" /> */}
            <FontAwesomeIcon icon={faUser} style={{ color: "white", cursor:"pointer", fontSize:"30px"}} onClick={handleLogInClick}/>
            {showProfileMenu && (

              
              <div className={s.menuDesplegable}>
                   <Link to="/account" className={s.link_menu} onClick={handleLogInClick} >
                  <h4>Ver perfil</h4>
                </Link>
                {/* <Link to="/historial-de-compra" className={s.link_menu} onClick={handleLogInClick}>
                  <h4>Historial de compras</h4>
                </Link> */}
                <Link to="/" className={s.link_menu} onClick={handleLogOut}>
                  <h4>Cerrar sesión</h4>
                </Link>
              </div>
            )}
          </div>
        )}



        <div style={{ position: "relative" }}>
          <Link to="/shopping-cart" style={{ textDecoration: "none" }}>
            {count !== 0 ? (
            <div
              style={{
                display: "inline-block",
                position: "absolute",
                top: "-10px",
                right: "-25px",
                width:"25px", 
                height:"25px", 
                backgroundColor:"rgb(248,93,91)", 
                borderRadius:"50%"
              }}
            >
              <h4 style={{ fontSize: "15px", color: "white" }}>
                {count}
              </h4>
            </div>) : ""}
            <div className={s.button}>
              {/* <AiOutlineShoppingCart size={40} /> */}
              <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "25px" }}/>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default NavBar;