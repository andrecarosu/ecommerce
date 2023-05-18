import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../detail/Detail.module.css'
import style from "./UpReview.module.css";
import swal from 'sweetalert';
import validations from "./validations";
import axios from 'axios'
const Review = (props) => {

  const { product} = useSelector(state => state)
  const dataProps = props
  const  id  = props.id
  console.log(14,id);
  const idDetail = props.idDetail
  console.log(13,idDetail);
  const [errors, setErrors] = useState({});
  
  const URL = process.env.REACT_APP_DEPLOYBACK_URL

  const [descripcion_motivo, setDescripcion_motivo] = useState();
  const [valor_calificacion, setValor_calificacion] = useState();
  
  const [form, setForm] = useState({
      id: id,
      detail_order_id: idDetail,
      comment:"",
      scoring:""
  });

  const handleSubmit = async event => {
    event.preventDefault();
// Obtiene los valores del formulario
    const {
      comment,
      scoring
    } = form;

 // captura de datos del estado form
    const data = {
      product_id: form.id,
      detail_order_id: form.detail_order_id,
      comment:form.comment,
      scoring:form.scoring
    }
// Realiza las validaciones
const errors = validations({
  comment,
  scoring
});
// Si hay errores, los muestra y no continúa con la solicitud
if (Object.keys(errors).length > 0) {
  setErrors(errors); // Actualiza el estado de los errores
} else {
  // Si no hay errores, continúa con el proceso de envío del formulario
  // ...
   try {
    console.log(200,data);
    await axios.post(`${URL}/review`, data)
    .then(res =>
      swal({
        title: "Calificación Exitosa",
        // text: "ya pedes ver tu calificación al dar click en la imagen del producto!",
        icon: "success",
        timer: "3000"
      })
    )   
    
   } catch(errorr){
       swal({
      text: "Error",
      text: "intente nuevamente",
      icon: "error",
      timer: "2000",
      button: "Accept"
    })
    
   }

   props.onClose()
   
  }}

  const handleInputChange = event =>{
    const property = event.target.name;
    const value = event.target.value;
    setForm(prevForm => ({
      ...prevForm,
      [property]: value
    }));

    const currentErrors = validations({ [property]: value });
    setErrors({ ...errors, [property]: currentErrors[property] });
  }

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm ,
      id:id,
      detail_order_id: idDetail     
    }));
  }, [id,idDetail]);

 

  return (
    <>
      <form onSubmit={handleSubmit} style={{border: "solid 1px rgb(200, 197, 197)", borderRadius:"3px"}}>     
        <div style={{ height:"100%" }}>
          <div style={{display: "flex", justifyContent:"center", fontSize:"30px", margin: "20px 0 0 0", color: "rgb(213, 161, 41)"}}>
            <h4>Deja un comentario</h4>
          </div>
          {/* <label>Calificar * </label> */}
          <div style={{display: "flex", justifyContent: "center"}}>
            <select
              className='form-input'
              name="scoring"
              style={{ width: '40%' }}
              value={form.scoring}
              onChange={handleInputChange}
              >
                <option value="0">Puntaje *</option>
                <option value="1" style={{color: "rgb(213, 161, 41)"}}>⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          {errors.scoring && (
            <div className={style.errors}>{errors.scoring}</div>
          )}
              
          {/* <label>¿Qué te pareció este producto? * </label> */}
          <div style={{display: "flex", justifyContent: "center"}}>
            <textarea 
              className={s.textarea}
              name="comment"
              value={form.comment}
              onChange={handleInputChange}
              cols="30" 
              rows="10"
              placeholder='Dejanos un comentario aquí...'>
            </textarea>
          </div>
            {errors.comment && (
              <div className={style.errors}>{errors.comment}</div>
            )}
            <div style={{display:"flex", justifyContent:"center", margin:"10px 0 15px 0"}}>
              <button className={s.btn} type='submit' >Enviar</button>
            </div>
        </div>
      </form>        
    </>
  )
}

export default Review