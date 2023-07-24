import { useState, useRef } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validations from "./validations";
import bcrypt from "bcryptjs"; // librería para encriptcar contraseñas
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomerErrorMessage from '../errorMessage/CustomerErrorMessage';
import styles from "./formRegister.module.css";
import ProgressBar from "../progressBar/ProgressBar";

export default function FormRegister() {
  const url = process.env.REACT_APP_DEPLOYBACK_URL

  const [image, setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwVMnPY9fmRkp19J1tQeeigdaBWi4XFDZGIvjAjEHy2JrE7NPZ0hRiBudfg4zEJ4_wPY&usqp=CAU");

  const initialValues = {
    type_id: 1,
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    estado: true,
    image: image
  }
 
  const handleInputChange = async event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ajr7own3"); 
    formData.append("api_key", "581299476786456"); 
    await axios.post(
      "https://api.cloudinary.com/v1_1/dfmkjxjsf/image/upload", formData)
      .then(res => {
        setImage(res.data.secure_url)
      })
      .catch(err => {
        console.log(err);
      })
  };

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handlerSubmit = async (values) => {
    console.log(values);
   values.image = image
    console.log(values, "Formulario enviado");
    await axios.post(`${url}/usuario`, values)
    .then(res => {
      console.log(res.data);
      swal({
        title: res.data,
        text: 'Ya puedes navegar con tu cuenta!',
        icon: 'success',
        timer: '3000'
      })
      setShouldRedirect(true);
    })
    .catch(err => {
      console.log(err.data);
      swal({
        title: 'Error',
        text: 'Este email ya está en uso, intente nuevamente con otro email',
        icon: 'error',
        timer: '3000',
        button: 'Accept'
      })
    })
  };

  const [ showPassword, setShowPassword ] = useState(false);
  const [ showRepeatPassword, setShowRepeatPassword ] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [ showSeccion1, setShowSeccion1 ] = useState(true);
  const [ showSeccion2, setShowSeccion2 ] = useState(false);
  const [ showSeccion3, setShowSeccion3 ] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; 
console.log(initialValues);
  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/log-in" />
      ) : (
        <Formik
          initialValues={initialValues}
          validate={(values) => validations(values)}
          onSubmit={(values) => handlerSubmit(values)}
        >
          {({ errors, touched, values }) => (
            <div style={{display:"flex", alignItems:"center", height:"100%"}}>
              <div className={styles.containerGlobal}>
                <div className={styles.containerProgress}>
                  <h2 className={styles.heading}>Crea tu cuenta</h2>
                  <p className={styles.text} >Registrate y accedé a descuentos exclusivos</p>
                  <div style={{width:"100%", position:"relative" }}>
                    <div>
                      <ProgressBar currentStep={currentStep} totalSteps={totalSteps}/>
                    </div>
                  </div>
                </div>
                
                <div className={styles.containerForm}>
                  <CloudinaryContext cloudName="dfmkjxjsf" className={styles.cloudinary}>
                    <Form className={styles.form}>
                      <div className={styles.containerSection}>
                        {showSeccion1 && 
                            <section>
                              <div className={styles.containerSteps}>
                                <div>
                                    {/* Nombre */}
                                    <div className={styles.containerInputLabel}>
                                      <div>                 
                                        <Field 
                                          type="text" 
                                          name="name"
                                          id="name"
                                          placeholder=' '  
                                          className={`
                                            ${styles.input} 
                                            ${touched.name && 
                                              errors.name && 
                                              styles.inputError}
                                          `}
                                        /> 
                                        <label 
                                          htmlFor= "" 
                                          className={`
                                            ${styles.label} 
                                            ${touched.name && 
                                              errors.name && 
                                              styles.labelError}
                                          `}
                                        >
                                          Nombre
                                        </label>
                                      </div>
                                    </div>
                                    <ErrorMessage 
                                      name="name" 
                                      component={CustomerErrorMessage} 
                                      additionalProp={errors.name}
                                    />
                                    {/* Apellido */}
                                    <div 
                                      className={`
                                        ${styles.containerInputLabel} 
                                        ${touched.name && 
                                          errors.name && 
                                          styles.containerInputLabelError}
                                      `}
                                    >
                                      <div>   
                                        <Field 
                                          type= 'text'
                                          name= "surname"
                                          id= 'surname'
                                          placeholder=' ' 
                                          className={`
                                            ${styles.input} 
                                            ${touched.surname && 
                                              errors.surname && 
                                              styles.inputError}
                                          `}
                                        /> 
                                        <label 
                                          htmlFor="" 
                                          className={`
                                            ${styles.label} 
                                            ${touched.surname && 
                                              errors.surname && 
                                              styles.labelError}
                                          `}
                                        >
                                          Apellido
                                        </label>
                                      </div> 
                                    </div>
                                    <ErrorMessage 
                                      name="surname" 
                                      component={CustomerErrorMessage} 
                                      additionalProp={errors.surname}
                                    />
                                    {/* Fecha de nacimiento */}
                                    <div 
                                      className={`
                                        ${styles.containerInputLabel} 
                                        ${touched.surname && 
                                          errors.surname && 
                                          styles.containerInputLabelError}
                                      `}
                                    >
                                      <div>   
                                        <Field 
                                          type='date'
                                          name= "date"
                                          id= 'date'
                                          placeholder=' ' 
                                          className={`
                                            ${styles.input} 
                                            ${touched.date && 
                                              errors.date && 
                                              styles.inputError}
                                          `}
                                        /> 
                                        <label 
                                          htmlFor="" 
                                          className={`
                                            ${styles.label} 
                                            ${touched.date && 
                                              errors.date && 
                                              styles.labelError}
                                          `}
                                        >
                                          Fecha de nacimiento
                                        </label>
                                      </div> 
                                    </div>
                                    <ErrorMessage 
                                      name="date" 
                                      component={CustomerErrorMessage} 
                                      additionalProp={errors.date}
                                    /> 
                                    {/* Botones */}
                                    <div 
                                      className={`
                                        ${styles.btnContainer} 
                                        ${touched.date && 
                                          errors.date && 
                                          styles.btnContainerError}
                                      `}>
                                      <button
                                        style={{width:"100%"}}  
                                        className={`
                                          ${styles.btnDisable} 
                                          ${values.name
                                            && values.surname
                                            && values.date
                                            && !errors.name
                                            && !errors.surname
                                            && !errors.date
                                            && styles.btnNext}
                                        `}
                                        disabled={
                                          !(values.name
                                          && values.surname
                                          && values.date
                                          && !errors.name
                                          && !errors.surname
                                          && !errors.date
                                        )} 
                                        onClick={() => {
                                          setShowSeccion1(false); 
                                          setShowSeccion2(true); 
                                          setCurrentStep(prevStep => prevStep + 1)}
                                        }    
                                      >
                                        Siguiente
                                      </button>
                                    </div>
                                </div>
                              </div>
                            </section>
                        }

                        {showSeccion2 &&
                          <section>
                            <div className={styles.containerSteps}>
                              <div>
                                  {/* Telefono */}
                                  <div className={styles.containerInputLabel} >
                                    <div>                 
                                      <Field 
                                        type="text" 
                                        name="phone"
                                        id="phone"
                                        placeholder=' '  
                                        className={`
                                          ${styles.input} 
                                          ${touched.phone && 
                                            errors.phone && 
                                            styles.inputError}
                                        `}
                                      /> 
                                      <label 
                                        htmlFor= "" 
                                        className={`
                                          ${styles.label} 
                                          ${touched.phone && 
                                            errors.phone && 
                                            styles.labelError}
                                        `}
                                      >
                                        Teléfono
                                      </label>
                                    </div>
                                  </div>
                                  <ErrorMessage 
                                    name="phone" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.phone} 
                                  />
                                  {/* Dirección */}
                                  <div 
                                    className={`
                                      ${styles.containerInputLabel} 
                                      ${touched.phone && 
                                        errors.phone && 
                                        styles.containerInputLabelError}
                                    `}
                                  >
                                    <div>   
                                        <Field 
                                          type= 'text'
                                          name= "address"
                                          id= 'address'
                                          placeholder=' ' 
                                          className={`
                                            ${styles.input} 
                                            ${touched.address && 
                                              errors.address && 
                                              styles.inputError}
                                          `}
                                        /> 
                                        <label 
                                          htmlFor="" 
                                          className={`
                                            ${styles.label} 
                                            ${touched.address && 
                                              errors.address && 
                                              styles.labelError}
                                          `}
                                        >
                                          Dirección
                                        </label>
                                    </div> 
                                  </div>
                                  <ErrorMessage 
                                    name="address" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.address}
                                  />
                                  {/*Ciudad  */}
                                  <div 
                                    className={`
                                      ${styles.containerInputLabel} 
                                      ${touched.address && 
                                        errors.address && 
                                        styles.containerInputLabelError}
                                    `} 
                                  >
                                    <div>                 
                                      <Field 
                                        type="text" 
                                        name="city"
                                        id="city"
                                        placeholder=' '  
                                        className={`
                                          ${styles.input} 
                                          ${touched.city && 
                                            errors.city && 
                                            styles.inputError}
                                        `}
                                      /> 
                                      <label 
                                        htmlFor= "" 
                                        className={`
                                          ${styles.label} 
                                          ${touched.city && 
                                            errors.city && 
                                            styles.labelError}
                                        `}
                                      >
                                        Ciudad
                                      </label>
                                    </div>
                                  </div>
                                  <ErrorMessage 
                                    name="city" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.city} 
                                  />
                                  {/* Botones */}
                                  <div 
                                    className={`
                                      ${styles.btnContainer} 
                                      ${touched.city && 
                                        errors.city && 
                                        styles.btnContainerError}`} 
                                    style={{ justifyContent:"space-between" }}>
                                    <button  
                                      className={styles.btnPrev} 
                                      onClick={() => {
                                        setShowSeccion2(false); 
                                        setShowSeccion1(true); 
                                        setCurrentStep(prevStep => prevStep - 1)}}
                                    >
                                      Anterior
                                    </button>
                                    <button  
                                      className={`
                                        ${styles.btnDisable} 
                                        ${values.phone 
                                          && values.address 
                                          && values.city 
                                          && !errors.phone 
                                          && !errors.address 
                                          && !errors.city  
                                          && styles.btnNext}
                                      `}
                                      disabled={
                                        !(values.phone
                                        && values.address
                                        && values.city
                                        && !errors.phone
                                        && !errors.address
                                        && !errors.city
                                      )} 
                                      onClick={() => {
                                        setShowSeccion2(false); 
                                        setShowSeccion3(true); 
                                        setCurrentStep(prevStep => prevStep + 1)}}
                                      >
                                        Siguiente
                                    </button>
                                  </div>
                              </div>
                            </div>
                          </section>
                        }

                        {showSeccion3 && 
                          <section>
                            <div className={styles.containerSteps}>
                              <div>
                                  {/* Email */}
                                  <div className={styles.containerInputLabel} >
                                    <div>                 
                                      <Field 
                                        type="text" 
                                        name="email"
                                        id="email"
                                        placeholder=' '  
                                        className={`
                                          ${styles.input} 
                                          ${touched.email && 
                                            errors.email && 
                                            styles.inputError}
                                        `}
                                      /> 
                                      <label 
                                        htmlFor= "" 
                                        className={`
                                          ${styles.label} 
                                          ${touched.email && 
                                            errors.email && 
                                            styles.labelError}
                                        `}
                                      >
                                        Email
                                      </label>
                                    </div>
                                  </div>
                                  <ErrorMessage 
                                    name="email" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.email} 
                                  />
                                  {/* Contraseña */}
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
                                        type={showPassword? 'text':'password'} 
                                        name="password"
                                        id="password"
                                        placeholder=' '  
                                        className={`
                                          ${styles.input} 
                                          ${touched.password && 
                                            errors.password && 
                                            styles.inputError}
                                        `}
                                      /> 
                                      <label 
                                        htmlFor= "" 
                                        className={`
                                          ${styles.label} 
                                          ${touched.password && 
                                            errors.password && 
                                            styles.labelError}
                                        `}
                                      >
                                        Contraseña
                                      </label>
                                      <span 
                                        onClick={
                                          ()=> {setShowPassword(!showPassword)}
                                        }  
                                        className={styles.password}
                                      >
                                        {!showPassword ? <FiEyeOff /> : <FiEye />}
                                      </span>
                                    </div>
                                  </div>
                                  <ErrorMessage 
                                    name="password" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.password} 
                                  />
                                  {/* Repetir contraseña */}
                                  <div 
                                    className={`
                                      ${styles.containerInputLabel} 
                                      ${touched.password && 
                                        errors.password && 
                                        styles.containerInputLabelError}
                                    `} 
                                  >
                                    <div>                 
                                      <Field 
                                        type={showRepeatPassword? 'text':'password'} 
                                        name="repeatPassword"
                                        id="repeatPassword"
                                        placeholder=' '  
                                        className={`${styles.input} ${touched.repeatPassword && errors.repeatPassword && styles.inputError}`}
                                      /> 
                                      <label 
                                        htmlFor= "" 
                                        className={`${styles.label} ${touched.repeatPassword && errors.repeatPassword && styles.labelError}`}
                                      >
                                        Repetir Contraseña
                                      </label>
                                      <span 
                                        onClick={
                                          ()=> {setShowRepeatPassword(!showRepeatPassword)}
                                        }  
                                        className={styles.password} 
                                      >
                                        {!showRepeatPassword ? <FiEyeOff /> : <FiEye />}
                                      </span>
                                    </div>
                                  </div>
                                  <ErrorMessage 
                                    name="repeatPassword" 
                                    component={CustomerErrorMessage} 
                                    additionalProp={errors.repeatPassword} 
                                  />
                                  {/* Botones */}
                                  <div 
                                    className={`
                                      ${styles.btnContainer} 
                                      ${touched.repeatPassword && 
                                        errors.repeatPassword && 
                                        styles.btnContainerError}`} 
                                    style={{justifyContent:"space-between"}}
                                  >
                                    <button  
                                      className={styles.btnPrev} 
                                      onClick={() => {
                                      setShowSeccion3(false); 
                                      setShowSeccion2(true); 
                                      setCurrentStep(prevStep => prevStep - 1)}}
                                    >
                                        Anterior
                                    </button>
                                    <button  
                                      className={`
                                        ${styles.btnDisable} 
                                        ${values.email 
                                          && values.password 
                                          && values.repeatPassword 
                                          && !errors.email 
                                          && !errors.password 
                                          && !errors.repeatPassword   
                                          && styles.btnNext}
                                    `} 
                                      type='submit'
                                    >
                                      Registrarse
                                    </button>
                                  </div>
                              </div>
                            </div>
                          </section>
                        }
                      </div>
                    </Form>
                  </CloudinaryContext>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}

    </>
  );
}

// /* ----------------------- CONTENEDOR GENERAL -----------------------*/
// <div className={s.contenedor}>
// {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
// <div className='form-container' style={{ padding: '15px' }}>
//   <CloudinaryContext cloudName="dfmkjxjsf">
//     <form onSubmit={handleSubmit}>
//       {/* ----------------------- PRIMER NOMBRE -----------------------*/}
//         <div className={s.contenedorDiv}>
//           <label  className={s.label}>
//             Nombre *
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleInputChange}
//             className={s.formInput}
//             style={{marginTop:"0px"}}
//           />

//           {errors.name && (
//             <div className={s.errors}>{errors.name}</div>
//           )}
//         </div>
//       {/* ----------------------- DIRECCION -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Dirección *
//         </label>
//         <input
//           type="text"
//           name="address"
//           value={form.address}
//           onChange={handleInputChange}
//           className={s.formInput}
//         />
//         {errors.address && (
//           <div className={s.errors}>{errors.address}</div>
//         )}
//       </div>

//       {/* ----------------------- TELEFONO -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Teléfono *
//         </label>
//         <input
//           type="text"
//           name="phone"
//           value={form.phone}
//           onChange={handleInputChange}
//           className={s.formInput}
//           />
//         {errors.phone && (
//           <div className={s.errors}>{errors.phone}</div>
//         )}
//       </div>

//       {/* ----------------------- EMAIL -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Email *
//         </label>
//         <input
//           type="text"
//           name="email"
//           value={form.email}
//           onChange={handleInputChange}
//           className={s.formInput}
//         />
//         {errors.email && (
//           <div className={s.errors}>{errors.email}</div>
//         )}
//       </div>

//       {/* ----------------------- CONTRASEÑA -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Contraseña *
//         </label>
//         <div style={{ position:"relative", width:"95%"}}>
//           <input
//             type={showPassword? 'text':'password'}
//             name="password"
//             value={form.password}
//             onChange={handleInputChange}
//             className={s.formInput}
//             style={{width:"100%", zIndex:"0"}}
//           />
//           <div onClick={handleShowPassword} style={{ position:"absolute", top:"10px", right:"20px", cursor:"pointer"}}>
//             {!showPassword ? <FiEyeOff /> : <FiEye />}
//           </div>
//         </div>
//         {errors.password && (
//           <div className={s.errors}>{errors.password}</div>
//         )}
//       </div>

//       {/* ----------------------- CIUDAD -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Ciudad *
//         </label>
//         <input
//           type="text"
//           name="city"
//           value={form.city}
//           onChange={handleInputChange}
//           className={s.formInput}
//         />
//         {errors.city && (
//           <div className={s.errors}>{errors.city}</div>
//         )}
//       </div>

//       {/* ----------------------- IMAGEN -----------------------*/}
//       <div className={s.contenedorDiv}>
//         <label  className={s.label}>
//           Imagen
//         </label>
//         <input
//           type="file"
//           id="imagen"
//           name="imagen"
//           onChange={handleInputChange}
//           className={s.formInput}
//         />

//         {/* ----------------------- VISTA PREVIA image -----------------------*/}
//         {form.image && (
//           <img
//             className={s.imageFile}
//             src={form.image}
//             id="imagen"
//             alt="foto perfil"
//           />
//         )}
//       </div>

//       <button type="submit">Registrase</button>
//     </form>
//   </CloudinaryContext>
// </div>
// </div>
