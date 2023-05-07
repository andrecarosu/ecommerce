import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import validations from "./validations";
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector, useDispatch } from "react-redux";
import { CloudinaryContext } from "cloudinary-react"; // para guardar las imágenes externamente 
import swal from "sweetalert"
import { getCategorys, getAllProducts, getProductById } from "../../../redux/actions"
import Cookies from "js-cookie";

import s from "./FormProduct.module.css"


export const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean'],
  ]
};

export default function FormCreateProduct() {
  const url = useLocation()

  //const [flagEdit, setFlagEdit] = useState(false)


  let flagEdit = url.pathname.includes("edit-product")


  const { id } = useParams()
  console.log(id)

  console.log('pille', url)
  const { categorys } = useSelector(state => state);
  const { supplier } = useSelector(state => state);
  const dispatch = useDispatch();

  const categoriasMatch = categorys ? categorys.flat(obj => obj?.categories)?.map(cat => {
    return { category_id: cat.category_id, name: cat.name }
  }) : []
  // let proveedor = values.dataValues

  let product = null

  useEffect(async () => {

    //setForm({})
    return () => {
      dispatch(getAllProducts())
    }
  }, [])

  product = useSelector(state => state.product)

  useEffect(() => {
    if (flagEdit) {
      console.log('aasdasd')
      dispatch(getProductById(id));
    }
  }, [flagEdit, id, dispatch]);

  useEffect(async () => {
    if (flagEdit) setForm({ ...product, category: product.Category_product.name })
  }, [product])

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);






  const [form, setForm] = useState({
    category: 0,
    name: "",
    normal_price: "",
    discount_price: "",
    description: "",
    stock: "",
    image: "",
    brand: "",
    state: true,
  });






  const getTextDescription = (description) => {
    const html = description;
    if (html == "") return
    const div = document.createElement('div');
    div.innerHTML = html;
    const textNodes = div.childNodes;

    let result = '';
    for (let i = 0; i < textNodes.length; i++) {
      result += textNodes[i].textContent;
    }
    return result
  }

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Llama a la función validations con el estado del formulario actual
    const currentErrors = validations(form);
    // Actualiza el estado de los errores con los errores actuales
    //setErrors(currentErrors);
  }, [form]);

  const handleSubmit = async event => {
    event.preventDefault();
    // Obtiene los valores del formulario
    const {

      category,
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
      category,
      name,
      normal_price,
      discount_price,
      description: getTextDescription(description),
      stock,
      image,
      brand,
      state,
    });
    console.log('-------->', form)

    // Si hay errores, los muestra y no continúa con la solicitud
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      setErrors(errors); // Actualiza el estado de los errores
    } else {
      // Si no hay errores, continúa con el proceso de envío del formulario
      let parsed = {
        ...form,
        normal_price: parseInt(form.normal_price),
        discount_price: parseInt(form.discount_price),
        stock: parseInt(form.stock),
        state: true
      }
      const request = !flagEdit ?
        axios.post("http://localhost:3001/products", parsed) :
        axios.put(`http://localhost:3001/products/${id}`, parsed);

      try {
        await request
          .then(res => {
            swal({
              title: !flagEdit ? 'Registro exitoso' : 'Actualizacion exitosa',
              text: 'se creo correctamente el producto',
              icon: 'success',
              timer: '2000'
            })
            setShouldRedirect(true);
          })
          .catch(err => {
            console.error("ocurrió un error:", err.response.data.error);
            swal({
              title: 'Error',
              text: err.response.data.error || 'intente nuevamente',
              icon: 'error',
              timer: '2000',
              button: 'Accept'
            })
          });
        console.log('-------->', form)

      } catch (error) {
        console.error("ocurrió un error:", error);
      }
    }
  };

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = async event => {
    let property = event.target.name
    let value = event.target.value;
    // Verificar si el input es de tipo file
    if (event.target.type === "file") {
      const file = event.target.files[0]; // Obtener el archivo seleccionado
      let valor = 0;
      if (file) valor = 1
      // console.log(valor);
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

      const currentErrors = validations({ [property]: property !== 'description' ? value : getTextDescription(value) });
      // setErrors(prevErrors => ({
      //   ...prevErrors,
      //   [property]: currentErrors[property]
      // }))  
      setErrors({ ...errors, [property]: currentErrors[property] });


    }
  }



  console.log('aqui', form)


  return (
    <>

      {shouldRedirect ? (
        <Redirect to="/dashboard/productos" />
      ) : (

        /* ----------------------- CONTENEDOR GENERAL -----------------------*/
        <div className={s.contenedor}>
          <h1 className={s.title}>
            {!flagEdit ? 'Crear nuevo producto' : `Editar ${product.name}`}
          </h1>

          {/* ----------------------- CONTENEDOR FORMULARIO -----------------------*/}
          <div className='form-container' style={{ padding: '15px' }}>
            <CloudinaryContext className={s.cloud} cloudName="dfmkjxjsf">

              <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.s1}>

                  {/* ----------------------- NOMBRE -----------------------*/}

                  <div className={s.group}>

                    <input
                      id="input1"
                      type="text"
                      name="name"
                      placeholder=" "
                      value={form.name}
                      onChange={handleInputChange}
                      className={s.inpt}
                    />
                    <label htmlFor="" className={s.lbl}>
                      Nombre Producto
                    </label>

                    {errors.name && (
                      <div className={s.errors}>{errors.name}</div>
                    )}
                  </div>


                  {/* ----------------------- PRECIO -----------------------*/}
                  <div className={s.precios}>
                    <div className={s.group}>


                      <input
                        id="input2"
                        type="text"
                        name="normal_price"
                        value={form.normal_price}
                        placeholder=" "
                        onChange={handleInputChange}
                        className={s.inpt}
                      />
                      <label htmlFor="" className={s.lbl}>
                        Precio
                      </label>
                      {errors.normal_price && (
                        <div className={s.errors}>{errors.normal_price}</div>
                      )}
                    </div>

                    {/* ----------------------- PRECIO CON DESCUENTO -----------------------*/}
                    <div className={s.group}>

                      <input
                        id="input2"
                        type="text"
                        name="discount_price"
                        placeholder=" "
                        value={form.discount_price}
                        onChange={handleInputChange}
                        className={s.inpt}
                      />
                      <label htmlFor="" className={s.lbl}>
                        Descuento
                      </label>
                      {errors.discount_price && (
                        <div className={s.errors}>{errors.discount_price}</div>
                      )}
                    </div>
                  </div>


                  {/* ----------------------- MARCA -----------------------*/}
                  <div className={s.group}>

                    <input
                      id="input3"
                      type="text"
                      name="brand"
                      value={form.brand}
                      placeholder=" "
                      onChange={handleInputChange}
                      className={s.inpt}
                    />
                    <label htmlFor="" className={s.lbl}>
                      Marca
                    </label>
                    {errors.brand && (
                      <div className={s.errors}>{errors.brand}</div>
                    )}
                  </div>

                  {/* ----------------------- MARCA -----------------------*/}
                  <div className={s.group}>

                    <input
                      id="input4"
                      type="text"
                      name="stock"
                      value={form.stock}
                      placeholder=" "
                      onChange={handleInputChange}
                      className={s.inpt}
                    />
                    <label htmlFor="" className={s.lbl}>
                      Stock
                    </label>
                    {errors.stock && (
                      <div className={s.errors}>{errors.stock}</div>
                    )}
                  </div>
                </div>
                <div className={s.s2}>
                  {/* ----------------------- IMAGEN -----------------------*/}
                  <div className={s.contenedorDiv}>
                    <label htmlFor="" className={`${s.label} ${!errors.image && form.image != "" ? s.up : null}`}>
                      Imagen
                    </label>
                    <input
                      id="input5"
                      type="file"
                      //id="image"
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

                  {/* ----------------------- CATEGORIA -----------------------*/}
                  <div className={s.contenedorDiv}>


                    <div>


                      <div className={s.group}>
                        <select
                          name="category"
                          onChange={e => handleInputChange(e)}
                          className='form-input'
                          style={{ width: '300px' }}
                          required
                        >
                          <option value={!flagEdit ? "" : form.category} >{!flagEdit ? "" : form.category}</option>
                          {categoriasMatch &&
                            categoriasMatch.map(c => (
                              <option key={c.category_id} value={c.category} primary={c.name}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                        <label htmlFor="category" style={{ left: '10px' }} className={s.lbl}>
                          Categoria
                        </label>
                        {errors.category && (
                          <div className={s.errors}>{errors.category}</div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>


                <div className={s.s3}>
                  {/* ----------------------- DESCRIPCION -----------------------*/}
                  <div className={s.descriptionContainer}>
                    <label htmlFor="" className={`${s.label} ${!errors.description
                      && form.description != "" ? s.up : ''}`}>
                      Descripción
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={form.description}
                      id="description"
                      onChange={(value) => handleInputChange({ target: { name: 'description', value } })}
                      className={s.rquill}
                      modules={modules}
                    ></ReactQuill>
                    {/* <input
                      type="text"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      className='form-input'
                    /> */}
                    {errors.description && (
                      <div className={s.errors}>{errors.description}</div>
                    )}
                  </div>
                  <button type="submit">{!flagEdit ? 'Crear Producto' : 'Guardar producto'}</button>
                </div>
















              </form>
            </CloudinaryContext>
          </div>
        </div >
      )
      }

    </>
  );
}



