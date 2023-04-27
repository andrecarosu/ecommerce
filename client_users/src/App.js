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
// import Footer from "./components/footer/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location?.pathname == "/log-in" ? null : <NavBar />}
      {/* {location?.pathname == "/login" ? null : <Footer />} */}
      <Route exact path="/" component={HomePrincipal} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/log-in" component={Login} />
      <Route exact path="/registrar-usuario" component={Register} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/about" component={About} />
      <Route exact path="/shopping-cart" component={ShoppingCart} />
      <Route exact path="/historial-de-compra" component={HistorialDeCompra} />
      <Footer />
    </div>
  );
}

export default App;
