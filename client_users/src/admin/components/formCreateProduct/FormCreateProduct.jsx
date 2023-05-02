import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validations from "./validations";
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import { getCategorys } from "../../../redux/actions"
import Cookies from "js-cookie";

import s from "../formCreateProduct/FormProduct.module.css"


export default function FormCreateProduct() {
  const { categorias } = useSelector(state => state);
  const { supplier } = useSelector(state => state);
  const dispatch = useDispatch();

  // let proveedor = values.dataValues

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);


  const [form, setForm] = useState({
    supplier_id: 0,
    category_id: 0,
    name: "",
    normal_price: 0,
    discount_price: 0,
    description: "",
    stock: 0,
    image: "",
    brand: "",
    state: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Llama a la función validations con el estado del formulario actual
    const currentErrors = validations(form);
    // Actualiza el estado de los errores con los errores actuales
    setErrors(currentErrors);
  }, [form]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Obtiene los valores del formulario
    const {
      supplier_id,
      category_id,
      name,
      normal_price,
      discount_price,
      description,
      stock,
      image,
      brand,
      state,
    } = form;

    // Realiza las validaciones
    const errors = validations({
      supplier_id,
      category_id,
      name,
      normal_price,
      discount_price,
      description,
      stock,
      image,
      brand,
      state,
    });


    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      try {
        await axios
          .post("http://localhost:3001/usuario", form)
          .then(res => {
            swal({
              title: 'Registro exitoso',
              text: 'se creo correctamente el producto',
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
        console.error("ocurrió un error:", error);
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

      const currentErrors = validations({ [property]: value });
      // setErrors(prevErrors => ({
      //   ...prevErrors,
      //   [property]: currentErrors[property]
      // }))  
      setErrors({ ...errors, [property]: currentErrors[property] });


    }
  }



  return (
    <>

      {shouldRedirect ? (
        <Redirect to="/admin" />
      ) : (

        /* ----------------------- CONTENEDOR GENERAL -----------------------*/
        <div className={s.contenedor}>
          {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
          <div className='form-container' style={{ padding: '15px' }}>
            <CloudinaryContext cloudName="dfmkjxjsf">
              <form onSubmit={handleSubmit}>

                {/* ----------------------- PROVEEDOR -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label for="" className={s.label}>
                    Proveedor
                  </label>

                  <div>

                    {errors.supplier_id && (
                      <div className={s.errors}>{errors.supplier_id}</div>
                    )}
                    <div className={s.contenedorDiv}>
                      <select
                        name="supplier_id"
                        onChange={e => handleInputChange(e)}
                        className='form-input'
                        style={{ width: '300px' }}
                      >
                        <option>Selecciona un proveedor</option>
                        {supplier &&
                          supplier.map(c => (
                            <option key={c.supplier_id} value={c.supplier_id} primary={c.name}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* ----------------------- NOMBRE -----------------------*/}
                <div className={s.nombres}>
                  <div className={s.contenedorDiv}>
                    <label for="" className={s.label}>
                      Nombre Producto
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

                {/* ----------------------- PRECIO -----------------------*/}
                <div className={s.apellidos}>
                  <div className={s.contenedorDiv}>

                    <label for="" className={s.label}>
                      Precio
                    </label>
                    <input
                      type="text"
                      name="normal_price"
                      value={form.normal_price}
                      onChange={handleInputChange}
                      className='form-input'
                    />
                    {errors.normal_price && (
                      <div className={s.errors}>{errors.normal_price}</div>
                    )}
                  </div>

                  {/* ----------------------- PRECIO CON DESCUENTO -----------------------*/}
                  <div className={s.contenedorDiv}>
                    <label for="" className={s.label}>
                      Precio con descuento
                    </label>
                    <input
                      type="text"
                      name="discount_price"
                      value={form.discount_price}
                      onChange={handleInputChange}
                      className='form-input'
                    />
                    {errors.discount_price && (
                      <div className={s.errors}>{errors.discount_price}</div>
                    )}
                  </div>
                </div>


                {/* ----------------------- DESCRIPCION -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label for="" className={s.label}>
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.description && (
                    <div className={s.errors}>{errors.description}</div>
                  )}
                </div>

                {/* ----------------------- MARCA -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label for="" className={s.label}>
                    Marca
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    className='form-input'
                  />
                  {errors.brand && (
                    <div className={s.errors}>{errors.brand}</div>
                  )}
                </div>

                {/* ----------------------- CATEGORIA -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label for="" className={s.label}>
                    Categoria
                  </label>

                  <div>

                    {errors.category_id && (
                      <div className={s.errors}>{errors.category_id}</div>
                    )}
                    <div className={s.contenedorDiv}>
                      <select
                        name="category_id"
                        onChange={e => handleInputChange(e)}
                        className='form-input'
                        style={{ width: '300px' }}
                      >
                        <option>Selecciona una categoría</option>
                        {categorias &&
                          categorias.map(c => (
                            <option key={c.category_id} value={c.category_id} primary={c.name}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ----------------------- IMAGEN -----------------------*/}
                <div className={s.contenedorDiv}>
                  <label htmlFor="" className={s.label}>
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    className='form-input'
                  />

                  {/* ----------------------- VISTA PREVIA IMAGEN -----------------------*/}
                  {form.image && (
                    <img
                      className={s.imageFile}
                      src={form.image}
                      id="image"
                      alt="imagen producto"
                    />
                  )}
                </div>

                <button type="submit">Crear Producto</button>
              </form>
            </CloudinaryContext>
          </div>
        </div>
      )}

    </>
  );
}
