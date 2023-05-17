import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import validation from './validation'
import swal from 'sweetalert'
import axios from 'axios'
import { initializeApp } from "firebase/app";
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import Google from "../../assets/images/IconGoogle.png"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { userLoggedIn } from "../../redux/actions";

import Cookies from 'js-cookie';

import styles from "../formLogin/FormLogin.module.css"
import { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDIr4a7cej0mw217G8qMwAGMx8R9MEYj2g",
  authDomain: "justoffers-85932.firebaseapp.com",
  projectId: "justoffers-85932",
  storageBucket: "justoffers-85932.appspot.com",
  messagingSenderId: "310201543546",
  appId: "1:310201543546:web:a6594aa4e7c9121351c4c3",
  measurementId: "G-R85GKECQZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//LAUTARO
export default function FormLogin() {
  const url = process.env.REACT_APP_DEPLOYBACK_URL
  const [activeForget, setActiveForget] = useState(false)
  const estado = true

  const logOut = false

  const dispatch = useDispatch()

  const iconGoogle = Google;

  const BACK_HOST = url
  const history = useHistory()
  const navigateTo = (url) => {
    history.push(url)
  }

  function login(user) {
    if (user) {
      dispatch(userLoggedIn(estado))
      swal({
        title: 'Bienvenido',
        text: 'Ya puedes navegar con tu cuenta!',
        icon: 'success',
        timer: '2000'
      });


      return Promise.resolve(true);
    } else {
      swal({
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        timer: '2000',
        button: 'Accept'
      });
      return Promise.resolve(false);
    }
  }


  const handleLogin = async (values) => {
    try {
      const user = await axios.post(`${BACK_HOST}/usuario/login`, values);
      console.log("USER:  ", user)
      const session = user.data.session;
      const token = user.data.token;
      console.log("session:  ", session)
      console.log("token:  ", token)

      // Almacenar el token y la sesión en cookies con opciones de seguridad
      Cookies.set('user_token', token, { secure: true, sameSite: 'strict' });
      Cookies.set('user_session', JSON.stringify(session), { secure: true, sameSite: 'strict' });
      console.log(session)

      const isUserAuthenticated = await login(true);
      if (isUserAuthenticated && session.dataValues?.type_id !== 2) {
        localStorage.setItem("estaLogueado", "database")
        navigateTo('/');
      } else if (isUserAuthenticated && session.dataValues?.type_id === 2) {
        localStorage.setItem("estaLogueado", "database")
        navigateTo('/dashboard');
      }
      else {
        console.log('Login failed');
      }
    } catch (error) {
      const err = error.response.data;
      swal({
        text: 'Email o contraseña invalido',
        icon: 'error',
        timer: '2000'
      });
      console.log(err)
    }
  };

  const onClickForget = () => {
    setActiveForget(!activeForget)
  }

  // carolina
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      if (user) {
        const session = user.email;
        console.log(30, session);
        Cookies.set('user_session', session, { secure: true, sameSite: 'strict' });
        swal({
          title: 'Bienvenido',
          text: 'Ya puedes navegar con tu cuenta!',
          icon: 'success',
          timer: '2000'
        });
        localStorage.setItem("estaLogueado", "google")
        navigateTo('/'); // Redirigir a la ruta localhost:3000/home
      } else {
        swal({
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          timer: '2000',
          button: 'Accept'
        });
      }
    } catch (error) {
      const err = error.response.data;
      swal({
        text: err.msg,
        icon: 'error',
        timer: '2000'
      });
    }
  }
  //carolina final
  return (
    <>
      {activeForget ? <ForgetPassword setActiveForget={setActiveForget} /> : null}
      <div className={styles.container}
      // style={{ width: '100%', maxWidth: '820px' }}
      >
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={handleLogin}
          validate={validation}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <Form className='form-container'>

            <Field name='email' type='email' placeholder='Email' className='form-input' />
            <ErrorMessage name='email' />

            <Field name='password' type='password' placeholder='Password' className='form-input' />
            <ErrorMessage name='password' />

            <div className={styles.botones}
            // style={{ marginTop: '20px' }}
            >
              <button className={styles.boton} type='submit' >Iniciar sesión</button>
              <h4 className={styles.linkForget} onClick={onClickForget}><u>Olvide mi contraseña</u></h4>

              <div className='or'>
                <div style={{ border: '1px solid grey', width: '90px' }}></div> <span style={{ margin: '0px 10px' }}>¿No tienes cuenta?</span> <div style={{ border: '1px solid grey', width: '90px' }}></div>
              </div>

              <Link to={'/registrar-usuario'}>
                <button type="button" className={styles.boton}>Registrarse</button>
              </Link>
            </div>

            <div>
              <button type="button" className={styles.botonRedes} onClick={handleGoogleLogin}><img className={styles.btnRedes} src={iconGoogle} /></button>
            </div>

          </Form>
        </Formik>
      </div>
    </>
  )
}