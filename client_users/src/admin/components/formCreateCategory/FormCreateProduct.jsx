import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validations from "./validations";
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import { getAllCategorias } from "../../../redux/actions"
import Cookies from "js-cookie";

import style from "../formCreateProduct/FormProduct.module.css"


export default function FormCreateProduct() {
  const { categorias } = useSelector(state => state);

  const dispatch = useDispatch();

  const session = Cookies.get("commerce_session");
  let values = JSON.parse(session)
  let comercio = values.dataValues

  useEffect(() => {
    dispatch(getAllCategorias());
  }, [dispatch]);
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    let {
      nombre,
      cantidad,
      descripcion_producto,
      existencia,
      fecha_final,
      fecha_inicial,
      imagen,
      id_categoria_producto,
      valor_normal,
      valor_con_descuento,
      condicion,
    } = form;


    cantidad = parseInt(cantidad);
    existencia = parseInt(existencia);
    valor_normal = parseFloat(valor_normal);
    valor_con_descuento = parseFloat(valor_con_descuento);

    // Realiza las validaciones
    const errors = validations({ 
      nombre,
      descripcion_producto,
      existencia,
      fecha_final,
      fecha_inicial,
      imagen,
      id_categoria_producto,
      valor_normal,
      valor_con_descuento,
      condicion,
  });

    // ...

    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      try {
        // Convierte los valores necesarios a números antes de enviar el formulario
        const formData = {
          ...form,
          cantidad: parseInt(form.cantidad),
          existencia: parseInt(form.existencia),
          valor_normal: parseFloat(form.valor_normal),
          valor_con_descuento: parseFloat(form.valor_con_descuento),
        };

        console.log(formData);

        await axios.post("http://localhost:3001/products", formData).then(res => {
          swal({
            title: "producto creado correctamente",
            text: "asd",
            icon: "success",
            timer: "2000",
          });
          setShouldRedirect(true);
        }).catch(err => {
          swal({
            title: "Error",
            text: "intente nuevamente",
            icon: "error",
            timer: "2000",
            button: "Accept",
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };







  const [shouldRedirect, setShouldRedirect] = useState(false);

  // const handleInputChange = event => {
  //   const property = event.target.name;
  //   const value = event.target.value;
  //   //   Verificar si el input es de tipo file
  //   if (event.target.type === "file") {
  //     const file = event.target.files[0]; // Obtener el archivo seleccionado
  //     setForm({ ...form, [property]: file }); // Actualizar el estado con el archivo seleccionado
  //   } else {
  //     setForm({ ...form, [property]: value });

  // };

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
          imagen: imageUrl // Actualiza la propiedad 'imagen' del estado con la URL de la imagen subida
        });
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        // Manejar el error aquí, por ejemplo mostrar un mensaje de error al usuario
      }
    } else {
      // Actualizar el estado del formulario para otros tipos de inputs
      setForm({
        ...form,
        [property]: value
      });
    }
  }

  const [form, setForm] = useState({
    nombre: "",
    fecha_inicial: "",
    fecha_final: "",
    descripcion_producto: "",
    // cantidad: "",
    existencia: "",
    valor_normal: "",
    valor_con_descuento: "",
    condicion: "",
    id_categoria_producto: "",
    imagen: "",
    id_comercio: comercio.id_comercio
  });

  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/" />
      ) : (
        <div className='form-container' style={{padding: '15px'}}>
          <CloudinaryContext cloudName="dfmkjxjsf">
            <form onSubmit={handleSubmit}>
              {/* ----------------------- nombre -----------------------*/}
              
                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    className='form-input'
                  />

                  {errors.nombre && (
                    <div className={style.errors}>{errors.nombre}</div>
                  )}
                </div>

                <div className={style.fechas}>
                  {/* ----------------------- fecha_inicial -----------------------*/}
                  <div className={style.contenedorDiv}>
                    <label for="" className='form-label'>
                      Fecha inicial
                    </label>
                    <input
                      type="date"
                      name="fecha_inicial"
                      value={form.fecha_inicial}
                      onChange={handleInputChange}
                      className='form-input'
                    />
                    {errors.fecha_inicial && (
                      <div className={style.errors}>{errors.fecha_inicial}</div>
                    )}

                  </div>


                  {/* ----------------------- fecha final -----------------------*/}
                  <div className={style.apellidos}>
                    <div className={style.contenedorDiv}>


                      <label for="" className='form-label'>
                        Fecha final
                      </label>
                      <input
                        type="date"
                        name="fecha_final"
                        value={form.fecha_final}
                        onChange={handleInputChange}
                        className='form-input'
                      />
                      {errors.fecha_final && (
                        <div className={style.errors}>{errors.fecha_final}</div>
                      )}
                    </div>
                  </div>
                </div>


                {/* ----------------------- descripcion de producto -----------------------*/}

                <div className={style.contenedorDiv}>
                  <label for="" className='form-label'>
                    Descripción del producto
                  </label>
                  <textarea
                    name="descripcion_producto"
                    value={form.descripcion_producto}
                    onChange={handleInputChange}

                    className='form-textarea'

                  />
                  {errors.descripcion_producto && (
                    <div className={style.errors}>{errors.descripcion_producto}</div>
                  )}
                </div>

              {/* ----------------------- EXISTENCIA -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-label'>
                  Stock disponible
                </label>
                <input
                  type="number"
                  name="existencia"
                  value={form.existencia}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.telefono && (
                  <div className={style.errors}>{errors.existencia}</div>
                )}
              </div>

              {/* ----------------------- VALOR NORMAL -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-label'>
                  Valor regular
                </label>
                <input
                  type="number"
                  name="valor_normal"
                  value={form.valor_normal}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.valor_normal && (
                  <div className={style.errors}>{errors.valor_normal}</div>
                )}
              </div>



              <div className={style.contenedorDiv}>
                <label for="" className='form-label'>
                  Condicion del producto
                </label>
                <input
                  type="text"
                  name="condicion"
                  value={form.condicion}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.condicion && (
                  <div className={style.errors}>{errors.condicion}</div>
                )}
              </div>

              {/* ----------------------- VALOR CON DESCUENTO  -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-label'>
                  Valor con descuento aplicado
                </label>
                <input
                  type="number"
                  name="valor_con_descuento"
                  value={form.valor_con_descuento}
                  onChange={handleInputChange}
                  className='form-input'
                />
                {errors.valor_con_descuento && (
                  <div className={style.errors}>{errors.valor_con_descuento}</div>
                )}
              </div>

              {/* ----------------------- CIUDAD -----------------------*/}
              <div className={style.contenedorDiv}>
                <label for="" className='form-label'>
                  Categoria
                </label>

                <div>

                  {errors.id_categoria_producto && (
                    <div className={style.errors}>{errors.id_categoria_producto}</div>
                  )}

                  <div className={style.contenedorDiv}>
                    <select
                      name="id_categoria_producto"
                      onChange={e => handleInputChange(e)}
                      className='form-input'
                    >
                      <option>Selecciona categoria</option>
                      {categorias &&
                        categorias.map(c => (
                          <option key={c.id_categoria_producto} value={c.id_categoria_producto} primary={c.nombre_categoria_producto}>
                            {c.nombre_categoria_producto}
                          </option>
                        ))}
                    </select>

                  </div>
                </div>
              </div>

              {/* ----------------------- IMAGEN -----------------------*/}
              <div className={style.contenedorDiv}>
                <label htmlFor="" className='form-label'>
                  Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleInputChange}
                  className='form-input'
                />                

                {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                {form.imagen && (
                  <img
                    className={style.imageFile}
                    src={form.imagen}
                    id="imagen"
                    alt="foto perfil"
                  />
                )}
              </div>

              <button type="submit" style={{fontSize: '25px'}}>Publicar oferta</button>
            </form>

          </CloudinaryContext>
        </div>
      )
      }
    </>
  );
}
