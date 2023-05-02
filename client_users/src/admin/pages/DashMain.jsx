import React from 'react';
import DashStyles from './DashMain.module.css'
import SideBar from '../components/SideBar/SideBar';
import { Route, Switch } from "react-router-dom"
import Productos from './Productos/Productos';
import Usuarios from './Usuarios/Usuarios';
import Ventas from './Ventas/Ventas';
import { useLocation } from "react-router-dom";
// import contentLayout from ''

const DashMain = () => {
    const location = useLocation();
    return (
        <>
            <div className={DashStyles.mainContainer}>
                <div className={DashStyles.sideContainer}>
                    <SideBar />
                </div>
                <div className={DashStyles.headerContainer}>
                    <h1></h1>
                </div>
                <div className={DashStyles.contentContainer}>
                    {/* {location?.pathname.includes("usuarios") ? <Usuarios /> : ''} */}
                    <Route exact path="" />
                    <Route path="/dashboard/usuarios" component={Usuarios} />
                    <Route path="/dashboard/productos" component={Productos} />
                    <Route path="/dashboard/ventas" component={Ventas} />
                </div>

            </div>
        </>
    );
}

export default DashMain;
