import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUsuarioByEmail, getUserById } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Image, CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert";
import validations from "./validations";
import style from "./FormUpdate.module.css";
import data from "../carouselAbout/data";

export default function FormUpdate({ idUsuario, emailResult, updateUserData }) {
  const usuario = useSelector(state => state.usuario) ?? [];
  //const [dataUsuario, setDataUsuario] = useState(usuario[0] || {});
  const [dataUsuario, setDataUsuario] = useState({});
  const url = process.env.REACT_APP_DEPLOYBACK_URL
  const updatedUserData = updateUserData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (usuario.length > 0) {
      setDataUsuario(usuario[0])
    }
  }, [idUsuario, usuario])


  const cargarEstado = () => {
    setDataUsuario({}); // Reinicializar el estado dataUsuario

    if (emailResult) {
      dispatch(getUsuarioByEmail(emailResult));
    }

    if (usuario.length > 0) {
      setDataUsuario(usuario[0]);
    }
  };


  // useEffect(() => {
  //   console.log('entro')
  //   const cargarEstado = async () => {
  //     if (emailResult) {
  //       await dispatch(getUsuarioByEmail(emailResult));
  //     }

  //     if (usuario.length > 0) {
  //       setDataUsuario(usuario[0]);
  //     }
  //   };

  //   cargarEstado(); // Ejecutar la función cargarEstado inicialmente

  //   if (window.location.reload) {
  //     cargarEstado(); // Ejecutar la función cargarEstado después de recargar la página
  //   }
  // }, [dispatch, emailResult, usuario]);

  const [form, setForm] = useState({})

  useEffect(() => {
    if (Object.keys(dataUsuario).length > 0) {
      setForm({
        user_id: idUsuario,
        name: dataUsuario.name,
        phone: dataUsuario.phone,
        address: dataUsuario.address,
        email: dataUsuario.email,
        city: dataUsuario.city,
        image: dataUsuario.image,
      })
    }

  }, [dispatch, dataUsuario, usuario, idUsuario])

  const usuarioId = idUsuario;
  const emailData = emailResult;
  console.log(15, emailData);


  // const [form, setForm] = useState({
  //   user_id: idUsuario,
  //   name: dataUsuario.name ? dataUsuario.name : "",
  //   address: dataUsuario.address ? dataUsuario.address : "",
  //   phone: dataUsuario.phone ? dataUsuario.phone : "",
  //   email: dataUsuario.email ? dataUsuario.email : "",
  //   city: dataUsuario.city ? dataUsuario.city : "",
  //   image: dataUsuario.image ? dataUsuario.image : "",
  // });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Llama a la función validations con el estado del formulario actual
    const currentErrors = validations(form);
    // Actualiza el estado de los errores con los errores actuales
    setErrors(currentErrors);
  }, [form]);


  //const { idUsuario } = props; //recibe por props el id_usuario que se le envía desde el componente Account

  const handleSubmit = async (event) => {
    event.preventDefault();

    // captura de datos del estado form
    const data = {
      user_id: form.user_id,
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
      city: form.city,
      estado: form.estado,
      image: form.image
    };

    // Obtiene los valores del formulario
    const { name, address, phone, email, password, city } = form;

    // Realiza las validaciones
    const errors = validations({
      name,
      address,
      phone,
      email,
      password,
      city
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Remover propiedades con valores falsy (vacíos) del objeto data
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => !!value)
      );

      let emailExists = false; // Variable para verificar si el email ya existe en la base de datos

      // Verificar si el correo ya existe en la base de datos
      await axios
        .get(`${url}/usuario?email=${filteredData.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            emailExists = true;
            swal({
              text: "Error",
              text: "Ya existe ese email en la base de datos",
              icon: "error",
              timer: "2000",
              button: "Accept",
            });
            emailExists = false;
          }
        })
        .catch((err) => console.log(err));

      // Si el correo no existe, se actualizan los datos
      if (!emailExists) {
        await axios
          .put(`${url}/usuario`, filteredData)
          .then((res) =>
            swal({
              title: "Actualización Exitosa",
              text: "Ya puedes ver tus cambios reflejados",
              icon: "success",
              timer: "2000",
            })
          )
          .then(() => {
            ; // Actualizar el estado antes de recargar la página
            //window.onload = () => {
              window.location.reload();
              cargarEstado()
            //};
          })
          .catch((err) =>
            swal({
              text: "Error",
              text: "Intente nuevamente, el correo ya existe",
              icon: "error",
              timer: "2000",
              button: "Accept",
            })
          );
      }
    }
  };


  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    // Verificar si el input es de tipo file
    if (event.target.type === "file") {
      const file = event.target.files[0]; // Obtener el archivo seleccionado
      let valor = 0;
      if (file) valor = 1;
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
        setForm(prevForm => ({
          ...prevForm, // Copia el estado actual del formulario
          image: imageUrl // Actualiza la propiedad 'imagen' del estado con la URL de la imagen subida
        }));
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

      const currentErrors = validations({ [property]: value });
      setErrors({ ...errors, [property]: currentErrors[property] });
    }
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      user_id: usuarioId
    }));
  }, [usuarioId]);



  return (
    <>
      { /* ----------------------- CONTENEDOR GENERAL -----------------------*/}
      <div className={style.contenedor}>
        {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
        <div className='form-container' style={{ padding: '15px', marginTop: '70px', marginBottom: '15px' }}>
          <CloudinaryContext cloudName="dfmkjxjsf">
            <form onSubmit={handleSubmit}>
              <label style={{ fontWeight: '600' }}>
                Actualizar datos de Perfil
              </label>
              {/* ----------------------- NOMBRE -----------------------*/}

              <div className={style.nombres}>
                <div className={style.contenedorDiv}>
                  <label className='form-update-label'>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className='form-input'
                    style={{ fontSize: '15px', margin: '5px' }}

                  />

                  {errors.name && (
                    <div className={style.errors}>{errors.name}</div>
                  )}

                </div>
              </div>

              {/* ----------------------- DIRECCION -----------------------*/}
              <div className={style.contenedorDiv}>
                <label className='form-update-label'>
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.address && (
                  <div className={style.errors}>{errors.address}</div>
                )}
              </div>

              {/* ----------------------- TELEFONO -----------------------*/}
              <div className={style.contenedorDiv}>
                <label className='form-update-label'>
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.phone && (
                  <div className={style.errors}>{errors.phone}</div>
                )}
              </div>

              {/* ----------------------- EMAIL -----------------------*/}
              <div className={style.contenedorDiv}>
                <label className='form-update-label'>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.email && (
                  <div className={style.errors}>{errors.email}</div>
                )}
              </div>


              {/* ----------------------- CIUDAD -----------------------*/}
              <div className={style.contenedorDiv}>
                <label className='form-update-label'>
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '15px', margin: '5px' }}
                />
                {errors.city && (
                  <div className={style.errors}>{errors.city}</div>
                )}
              </div>

              {/* ----------------------- IMAGEN -----------------------*/}
              <div className={style.contenedorDiv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label bel className='form-update-label'>
                  Imagen
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleInputChange}
                  className='form-input'
                  style={{ fontSize: '13px', margin: '5px' }}
                />
                <div>
                </div>

                {/* ----------------------- VISTA PREVIA image -----------------------*/}
                {form.image && (
                  <img
                    className={style.imageFile}
                    src={form.image}
                    id="image"
                  />
                )}
              </div>

              <button type="submit" style={{ fontSize: '15px', margin: '5px' }}>Actualizar</button>
            </form>
          </CloudinaryContext>
        </div>


      </div>
    </>
  );
}
