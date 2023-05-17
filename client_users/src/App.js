import "./App.css";
import { Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import NavBar from "./components/navBar/NavBar";
import HomePrincipal from "./pages/homePrincipal/HomePrincipal";
import Footer from "./components/footer/Footer";
import ShoppingCart from "./pages/shopping/ShoppingCart";
import HistorialDeCompra from "./pages/shoppingHistory/ShoppingHistory";
import DashMain from "./admin/pages/DashMain"
import PaySuccess from "./pages/paySuccess/paySuccess";
import PayFailure from "./pages/payFailure/PayFailure";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { path } from "./redux/actions";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    //RESETEA EL SCROLL EN CERO
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // PROTEGE LAS RUTAS 
    if(location.pathname !== "/shopping-cart/success"){
      localStorage.setItem("permission", false)
    };
    if(location.pathname !== "/shopping-cart/failure") {
      localStorage.setItem("permission", false)
    };
    //
    dispatch(path(location.pathname))
  }, [location.pathname])

  const permission = localStorage.getItem("permission")


  return (
    <div className="App">

      {location?.pathname == "/log-in"
        || location?.pathname.includes("dashboard")
        || location?.pathname == "/shopping-cart/success"
        || location?.pathname === "/shopping-cart/failure"
        ? '' : <NavBar />}
      {/* {location?.pathname == "/login" ? null : <Footer />} */}
      <Switch>
        <Route exact path="/" component={HomePrincipal} />
        <Route exact path="/product" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/log-in" component={Login} />
        <Route exact path="/registrar-usuario" component={Register} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/about" component={About} />
        <Route exact path="/shopping-cart" component={ShoppingCart} />
        <Route exact path="/historial-de-compra" component={HistorialDeCompra} />
        <Route path="/dashboard" render={() => <DashMain />} >
          {/* <Route exact path="/usuarios" /> */}
        </Route>
        {permission === "false" ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/shopping-cart/success" component={PaySuccess} />
          )}
        {permission === "false" ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/shopping-cart/failure" component={PayFailure} />
          )}
        
      </Switch>


      {location?.pathname.includes("dashboard")
        || location?.pathname === "/shopping-cart/success"
        || location?.pathname === "/shopping-cart/failure"
        ? '' : <Footer />}

    </div>
  );
}

export default App;
