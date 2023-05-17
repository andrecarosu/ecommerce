import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validations from "./validations";
import bcrypt from "bcryptjs"; // librería para encriptcar contraseñas
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"

import s from "./formRegister.module.css";

export default function FormRegister() {
  const url = process.env.REACT_APP_DEPLOYBACK_URL
    const [form, setForm] = useState({
    type_id: 1,
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    estado: true,
    image: "",
  });

  const [errors, setErrors] = useState({}); 

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    const { name,      
      address,
      phone,
      email,
      password,
      city,
    } = form;

    // Realiza las validaciones
    const errors = validations({
      name,
      address,
      phone,
      email,
      password,
      city
    });


    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(form.password, salt);
        setForm({ ...form, password: hashedPassword });

        await axios
          .post(`${url}/usuario`, form)
          .then(res => {
            swal({
              title: 'Registro exitoso',
              text: 'Ya puedes navegar con tu cuenta!',
              icon: 'success',
              timer: '2000'
            })
            setShouldRedirect(true);
          })
          .catch(err => {
            swal({
              title: 'Error',
              text: 'intente nuevamente',
              icon: 'error',
              timer: '2000',
              button: 'Accept'
            })
          });

      } catch (error) {
        console.error("Error al encriptar la password:", error);
      }
    }
  };

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    // Verificar si el input es de tipo file
    if (event.target.type === "file") {
      const file = event.target.files[0]; // Obtener el archivo seleccionado
      let valor = 0;
      if (file) valor = 1
      console.log(valor);
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajr7own3"); // Reemplazar con tu upload preset de Cloudinary
      formData.append("api_key", "581299476786456"); // Reemplazar con tu API Key de Cloudinary


      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfmkjxjsf/image/upload",
          formData
        );

        // Obtener la URL de la imagen subida desde la respuesta de Cloudinary
        console.log(response.data.secure_url);
        const imageUrl = response.data.secure_url;


        // Actualizar el estado del formulario con la URL de la imagen subida
        setForm({
          ...form, // Copia el estado actual del formulario
          image: imageUrl // Actualiza la propiedad 'imagen' del estado con la URL de la imagen subida
        });
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        // Manejar el error aquí, por ejemplo mostrar un mensaje de error al usuario
      }
    } else {
      // Actualizar el estado del formulario para otros tipos de inputs
      setForm(prevForm => ({
        ...prevForm,
        [property]: value
      }));
    }

      const currentErrors = validations({ [property]: value });
      // setErrors(prevErrors => ({
      //   ...prevErrors,
      //   [property]: currentErrors[property]
      // }))  
      setErrors({ ...errors, [property]: currentErrors[property] });


  }

  useEffect(() => {
    // // Llama a la función validations con el estado del formulario actual
    // const currentErrors = validations(form);
    // // Actualiza el estado de los errores con los errores actuales
    // setErrors(currentErrors);
    setForm(prevForm => ({
       ...prevForm 
      // id:id,
      // email:email     
    }));
    }, []);

  return (
    <>

      {shouldRedirect ? (
        <Redirect to="/log-in" />
      ) : (

        /* ----------------------- CONTENEDOR GENERAL -----------------------*/
        <div className={s.contenedor}>
          {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
          <div className='form-container' style={{ padding: '15px' }}>
            <CloudinaryContext cloudName="dfmkjxjsf">
              <form onSubmit={handleSubmit}>
                {/* ----------------------- PRIMER NOMBRE -----------------------*/}
                <div className={s.nombres}>
                  <div className={s.contenedorDiv}>
                    <label  className={s.label}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className='form-input'
                    />

                    {errors.name && (
                      <div className={s.errors}>{errors.name}</div>
                    )}
                  </div>
                  </div>

                {/* ----------------------- DIRECCION -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.address && (
                    <div className={s.errors}>{errors.address}</div>
                  )}
                </div>

                {/* ----------------------- TELEFONO -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.phone && (
                    <div className={s.errors}>{errors.phone}</div>
                  )}
                </div>

                {/* ----------------------- EMAIL -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.email && (
                    <div className={s.errors}>{errors.email}</div>
                  )}
                </div>

                {/* ----------------------- CONTRASEÑA -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.password && (
                    <div className={s.errors}>{errors.password}</div>
                  )}
                </div>

                {/* ----------------------- CIUDAD -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.city && (
                    <div className={s.errors}>{errors.city}</div>
                  )}
                </div>

                {/* ----------------------- IMAGEN -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label  className={s.label}>
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleInputChange}
                    className='form-input'
                  />

                  {/* ----------------------- VISTA PREVIA image -----------------------*/}
                  {form.image && (
                    <img
                      className={s.imageFile}
                      src={form.image}
                      id="imagen"
                      alt="foto perfil"
                    />
                  )}
                </div>

                <button type="submit">Registrase</button>
              </form>
            </CloudinaryContext>
          </div>
        </div>
      )}

    </>
  );
}
