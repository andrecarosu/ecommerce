import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from '../detail/Detail.module.css'
import style from "./UpReview.module.css";
import swal from 'sweetalert';

import axios from 'axios'
const Review = (props) => {

  const { product} = useSelector(state => state)
  const dataProps = props
  console.log(8,dataProps);
  console.log(9,product);
  const  id  = props.id
  console.log(10,id);
  const email = props.email
  console.log(11,email);
  
  const URL = 'https://ecommerce-khaki-nine.vercel.app'

  const [descripcion_motivo, setDescripcion_motivo] = useState();
  const [valor_calificacion, setValor_calificacion] = useState();

  async function handleSubmit() {
    const data = {
      product_id: id,
      email: email,
      comment:descripcion_motivo,
      scoring:valor_calificacion
    }
    await axios.post(`${URL}/review`, data)
    setDescripcion_motivo()
    setValor_calificacion()
  }

  // const { mostrarProp } = props
  // const [mostrar, setMostrar] = useState(mostrarProp)
  // const handleMostrar = () => {
  //   setMostrar(!mostrar)
  // }


  return (
    <>
      <div style={{marginBottom: '50px'}}>
        <h1>Deja un comentario</h1>
        <label>Calificar</label>
        <select
          className='form-input'
          style={{ width: '40%' }}
          value={valor_calificacion}
          onChange={(e) => setValor_calificacion(e.target.value)}
        >
          <option value="0">Puntaje</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <form className={s.form} onSubmit={handleSubmit}>
          <label>¿Qué te pareció este producto?</label>
          <textarea 
            className={s.textarea}
            value={descripcion_motivo}
            onChange={(e) => setDescripcion_motivo(e.target.value)}
            cols="30" 
            rows="10"
            placeholder='Dejanos un comentario aquí...'>
          </textarea>
          <button className={s.btn} type='submit'>Enviar</button>
        </form>
      </div>
  
      <div>
        <h2>Comentarios:</h2>
        {descripcion_motivo && Array.isArray(descripcion_motivo) && descripcion_motivo.map((comentario, index) => (
  <div key={index}>
    <p>{comentario}</p>
    <p>Calificación: {valor_calificacion[index]}</p>
  </div>
))}
      </div>
    </>
  );
  
}

export default Review