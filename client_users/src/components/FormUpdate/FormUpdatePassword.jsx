import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validations from "./validationsPassword";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import style from "./UpPassword.module.css";

export default function FormUpdatePassword(props) {
  const { idUsuario } = props; //recibe por props el id_usuario que se le envía desde el componente Account
  const usuarioId = idUsuario;

  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    const {
      id_usuario: id_usuario,
      password: password,
      confirmPassword: confirmPassword
    } = form;

    const data = {
      id_usuario: form.id_usuario,
      password: form.password,
    }

    console.log(data);

    // Realiza las validaciones
    const errors = validations({
      password,
      confirmPassword
    });
    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      // ...

      // Si no hay errores, continúa con el proceso de envío del formulario
      try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        setForm({ ...form, password: hashedPassword });
        await axios
          .put("https://ecommercedep.onrender.com//usuario", { ...data, password: hashedPassword }) // Actualiza el valor de 'password' en el objeto de datos enviado
          .then(res =>
            swal({
              title: "Cambio exitoso",
              text: "Debes loguearte nuevamente!",
              icon: "success",
              timer: "2000"
            })
          )
          .catch(err =>
            swal({
              text: "Error",
              text: "intente nuevamente",
              icon: "error",
              timer: "2000",
              button: "Accept"
            })
          );

        setShouldRedirect(true);
      } catch (error) {
        console.error("Error al encriptar la password:", error);
      }
      // ...

    }
  };
  const [form, setForm] = useState({
    id_usuario: null,
    password: "",
    confirmPassword: ""
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { mostrarProp } = props
  const [mostrar, setMostrar] = useState(mostrarProp)
  const handleMostrar = () => {
    setMostrar(!mostrar)
  }

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      id_usuario: idUsuario
    }));
  }, [idUsuario]);

  // useEffect(() => {
  //   setMostrar(mostrarProp)
  // })


  const handleInputChange = async event => {
    const property = event.target.name;
    const value = event.target.value;
    setForm(prevForm => ({
      ...prevForm,
      [property]: value
    }));
    // Validar el campo actual y actualizar el estado de errores
    const currentErrors = validations({ [property]: value });
    setErrors(prevErrors => ({
      ...prevErrors,
      [property]: currentErrors[property]
    }))
  };


  return (

    <>

      {shouldRedirect ? (
        <Redirect to="/log-in" />
      ) : (
        <div className={mostrar ? style.container : style.ocultar}>
          <button className={style.cerrar} onClick={handleMostrar}>Cancelar</button>
          <form onSubmit={handleSubmit}>
            <label>Nueva Contraseña:</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className='form-input'
            />
            {errors.password && (
              <div className={style.errors}>{errors.password}</div>
            )}

            <label>Confirmar Contraseña:</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className='form-input'
            />
            {errors.confirmPassword && (
              <div className={style.errors}>{errors.confirmPassword}</div>
            )}
            <br></br>
            <button type="submit">Actualizar</button>
          </form>
        </div>

      )}

    </>
  )

}