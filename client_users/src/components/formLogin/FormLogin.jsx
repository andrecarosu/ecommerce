import styles from "../formLogin/FormLogin.module.css"
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import CustomerErrorMessage from '../errorMessage/CustomerErrorMessage';
import swal from 'sweetalert'
import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validation from './validation'
import Cookies from 'js-cookie';
import { initializeApp } from "firebase/app";
import Google from "../../assets/images/IconGoogle.png"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userLoggedIn } from "../../redux/actions";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ButtonBack from "../../components/buttonBack/ButtonBack";

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
        timer: '3000'
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
    console.log(values);
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
      if (isUserAuthenticated && session.dataValues?.estado === true && session.dataValues?.type_id !== 2) {
        localStorage.setItem("estaLogueado", "database")
        navigateTo('/');
      } else if (isUserAuthenticated && session.dataValues?.estado === true && session.dataValues?.type_id === 2) {
        localStorage.setItem("estaLogueado", "database")
        navigateTo('/dashboard');
      }
      else {    
            swal({
            text: 'por el momento estás inactivo',
            icon: 'error',
            timer: '3000'
          })
          navigateTo('/')
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
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //carolina final
  return (
    <>
      {activeForget ? <ForgetPassword setActiveForget={setActiveForget} /> : null}

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(values) => validation(values)}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ errors, touched }) => (
          <div className={styles.containerGlobal}>
            <div className={styles.container}>
              <ButtonBack/>
              <Form className={styles.form}>
              <img 
                src="https://res.cloudinary.com/dfmkjxjsf/image/upload/v1689204793/logos/Black_and_Gold_Classy_Minimalist_Circular_Name_Logo_1_kfbf0d.png" 
                alt="" 
                style={{width:"200px", height:"200px"}} 
              />

                <div 
                  className={styles.containerInputLabel}
                  style={{margin:"0px"}} 
                >
                  <div>                 
                    <Field 
                      type="text" 
                      name="email"
                      id="email"
                      placeholder=' '  
                      className={`${styles.input} ${touched.email && errors.email && styles.inputError}`}
                    /> 
                    <label 
                      htmlFor= "" 
                      className={`${styles.label} ${touched.email && errors.email && styles.labelError}`}
                    >
                      Email
                    </label>
                  </div>
                </div>
                <ErrorMessage 
                  name="email" 
                  component={CustomerErrorMessage} 
                  additionalProp={errors.email} />

                <div 
                  className={`
                    ${styles.containerInputLabel} 
                    ${touched.email && 
                      errors.email && 
                      styles.containerInputLabelError}
                  `} 
                >
                  <div>   
                    <Field 
                      type= {showPassword? 'text':'password'} 
                      name= "password"
                      id= 'password'
                      placeholder=' ' 
                      className={`${styles.input} ${touched.password && errors.password && styles.inputError}`}
                    /> 
                    <label 
                      htmlFor="" 
                      className={`${styles.label} ${touched.password && errors.password && styles.labelError}`}
                    >
                      Contraseña
                    </label>
                    <span onClick={handleShowPassword}  className={styles.password} >
                      {!showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div> 
                </div>
                  <ErrorMessage 
                    name="password" 
                    component={CustomerErrorMessage} 
                    additionalProp={errors.password}/>

                <div 
                  onClick={onClickForget} 
                  className={`
                    ${styles.containerForget} 
                    ${touched.password && 
                      errors.password && 
                      styles.containerForgetError}
                  `} 
                >
                  <div>
                    <div>Olvide mi contraseña</div>
                  </div>
                </div>

                <div 
                  className={`
                    ${styles.btnContainer} 
                    ${touched.password && 
                      errors.password && 
                      styles.btnContainerError}
                  `} 
                >
                  <button  className={styles.btn} type='submit'>Iniciar sesión</button>
                </div>

                <div style={{ margin:"20px 0 20px 0"}}>
                  <span>¿No tienes una cuenta?</span>
                  <Link to={'/registrar-usuario'}>
                    <span className={styles.register}>Registrarse</span>
                  </Link>
                </div>

                <div className={styles.containerOr}>
                  <div className={styles.Or}>
                    <span></span>
                    <span style={{zIndex:"999"}}>ó</span>
                    <span></span>
                  </div>
                  <div className={styles.hr}>
                    <hr />
                  </div>
                </div>

                <div className={styles.containerGoogle} style={{position:"initial"}}>
                  <div onClick={handleGoogleLogin}>
                    <img src={iconGoogle} alt=''/>
                    <span>Continuar con Google</span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>      
    </>
  )
};

// {activeForget ? <ForgetPassword setActiveForget={setActiveForget} /> : null}
//       <div className={styles.container}
//       style={{ width: '100%', maxWidth: '820px' }}
//       >
//         <Formik
//           initialValues={{
//             email: '',
//             password: ''
//           }}
//           onSubmit={handleLogin}
//           validate={validation}
//           validateOnBlur={true}
//           validateOnChange={true}
//         >
//           <Form className='form-container'>

//             <div className='form-input' >
//               <Field name='email' type='email' placeholder='Email *' className='form-input' />
//              <div className='divs'>
//              <span className='error'> <ErrorMessage name='email' className='error' />  </span>
//              </div>
//             </div>

//             <div className='form-input' style={{position:"relative"}}>
//               <Field name='password' type={showPassword? 'text':'password'} placeholder='Contraseña *' className='form-input' />
//               <span className='error'><ErrorMessage name='password' className='error' /> </span>
//               <div onClick={handleShowPassword} style={{position:"absolute", top:"30px", right:"30px", cursor:"pointer"}}>
//                 {!showPassword ? <FiEyeOff /> : <FiEye />}
//               </div>
//             </div>

//             <div className={styles.botones}>
//               <button className={styles.boton} type='submit' >Iniciar sesión</button>
//               <div style={{margin: "20px 0px 30px 0px"}}>
//                 <h4 className={styles.linkForget} onClick={onClickForget}><u>Olvide mi contraseña</u></h4>
//               </div>
//               <div className='or' style={{margin:"10px, 10px 10px 25px"}}>
//                 <div style={{ border: '1px solid grey', width: '90px' }}></div> <span style={{ margin: '0px 10px' }}>¿No tienes cuenta?</span> <div style={{ border: '1px solid grey', width: '90px' }}></div>
//               </div>

//               <Link to={'/registrar-usuario'}>
//                 <button type="button" className={styles.boton}>Registrarse</button>
//               </Link>
//             </div>

//             <div style={{margin:"20px"}}>
//               <button type="button" className={styles.botonRedes} onClick={handleGoogleLogin}><img className={styles.btnRedes} src={iconGoogle} /></button>
//             </div>

//           </Form>
//         </Formik>
//       </div>