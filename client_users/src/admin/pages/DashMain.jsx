import { React, useEffect } from 'react';
import DashStyles from './DashMain.module.css'
import SideBar from '../components/SideBar/SideBar';
import { Route, Switch } from "react-router-dom"
import Productos from './Productos/Productos';
import Usuarios from './Usuarios/Usuarios';
import Ventas from './Ventas/Ventas';
import Graphic from '../components/graphic/graphic';
import Menu from './Menu/Menu';
import FormCreateProduct from '../components/formCreateProduct/FormCreateProduct';
import Calificaciones from './Calificaciones/Calificaciones';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { getCategorys, getAllProducts, getFamilies } from '../../redux/actions';

// import contentLayout from ''
const type_permission = 2;
//esto de pronto podemos mejorarlo de tal forma que se haga con los JWT y no asi
const DashMain = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = Cookies.get('user_token');

    const session = token ? JSON.parse(Cookies.get('user_session')) : null;
    console.log('->>', session)

    useEffect(() => {
        dispatch(getCategorys());
        dispatch(getAllProducts());
        dispatch(getFamilies())
    }, [dispatch])


    if (!session || session.dataValues.type_id !== type_permission) {
        return <div>No tiene permisos</div>
    }
    
    if (location.pathname !== '/dashboard' && location.pathname !== '/dashboard/') {
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
                    <Route exact path="/dashboard" component={Menu} />
                    <Route path="/dashboard/usuarios" component={Usuarios} />
                    <Route exact path="/dashboard/productos" component={Productos} />
                    <Route exact path="/dashboard/productos/crear-producto" component={FormCreateProduct} />
                    <Route exact path="/dashboard/productos/edit-product/:id" component={FormCreateProduct} />
                    <Route exact path="/dashboard/productos/ver-calificaciones" component={Calificaciones} />
                    </div>
                </div>
            </>
        );
    }
    
    
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
        return (
            <>
                <div className={DashStyles.mainContainer}>
                    <div className={DashStyles.sideContainer}>
                        <SideBar />
                    </div>
                    <div className={DashStyles.headerContainer}>

                    </div>
                    <div className={DashStyles.contentContainer}>
                     {/* {location?.pathname.includes("usuarios") ? <Usuarios /> : ''} */}
                    <Route exact path="/dashboard" component={Menu} />
                    <Route path="/dashboard/usuarios" component={Usuarios} />
                    <Route exact path="/dashboard/productos" component={Productos} />
                    <Route exact path="/dashboard/productos/crear-producto" component={FormCreateProduct} />
                    <Route exact path="/dashboard/productos/edit-product/:id" component={FormCreateProduct} />
                    <Route exact path="/dashboard/productos/ver-calificaciones" component={Calificaciones} />
                    <Graphic />
                    </div>
                </div>
            </>
        )
    }
}

export default DashMain;
