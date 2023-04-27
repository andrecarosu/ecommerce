import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import QuantityDisplay from '../../components/quantityDisplay/QuantityDisplay'
import { agregarAlCarrito, getProductById, cleanProduct, getReviews, cleanReviews, agregarCount } from '../../redux/actions'
import { Redirect } from "react-router-dom";
import s from './Detail.module.css'
import swal from 'sweetalert'
import CardsReviews from "../../components/cardsReviews/CardsReviews"

import axios from 'axios'


const Detail = () => {

  const { product, carrito } = useSelector(state => state)
  console.log(product);
  const { id } = useParams()
  const dispatch = useDispatch();
  const estaLogueado = localStorage.getItem("estaLogueado");

  const URL = 'http://localhost:3001'

  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(getReviews(id))
    return (() => {
      dispatch(cleanProduct())
      dispatch(cleanReviews())
    })
  }, [dispatch, id])

  //Cuando se agrega al carrito
  const handlerCarrito = () => {
    const exists = carrito?.find(e => {
      return e.id_producto === product.id_producto
    })


   if(estaLogueado === "database" || estaLogueado === "google"){
    if(!exists){
      dispatch(agregarAlCarrito(product, quantity))
      dispatch(agregarCount(quantity))
       swal({
         title: `Agregaste ${product.nombre}`,
         icon: "success",
         timer: "3000",
         showConfirmButton: false
       })
      }else{
        swal({
          title: `Este articulo ya está agregado`,
          text: "Para modificar la cantidad dirijase al carrito de compra",
          icon: "error",
          timer: "3000"
        })
      }
   }else{
    swal({
      title: `Debe de iniciar sesion para comprar`,
      icon: "info",
      timer: "3000"
    })
   }
  }  
  
  // Cantidad de articulos
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleIncrease = () => {
    if (quantity !== product.existencia) {
      setQuantity(quantity + 1);
    } else {
      swal({
        title: 'Número máximo de unidades disponibles',
        icon: 'info'
      })
    }
  }
  //Boton comprar ahora
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handlerComprar = () => {
    const exists = carrito?.find(e => {
      return e.id_producto === product.id_producto
    })

    if(estaLogueado === "database" || estaLogueado === "google"){
      if(!exists){
        dispatch(agregarAlCarrito(product, quantity))
        dispatch(agregarCount(quantity))
      }
      setShouldRedirect(true)
    }else{
      swal({
        title: `Debe de iniciar sesion para comprar`,
        icon: "info",
        timer: "3000"
      })

    }
  }

  const [descripcion_motivo, setDescripcion_motivo] = useState();
  const [valor_calificacion, setValor_calificacion] = useState();

  async function handleSubmit() {
    const data = {
      id: id,
      descripcion_motivo,
      valor_calificacion
    }
    await axios.post(`${URL}/products/${id}/calificacion`, data)
    setDescripcion_motivo()
    setValor_calificacion()
  }


  return (
    <>
      {carrito && shouldRedirect
        ? <Redirect to="/shopping-cart" />
        : (<div>
          <div className={s.box1}>
            <div className={s.container}>
              <div style={{ position: "relative" }}>
                <div className={s.container_img}>
                  <img className={s.image} src={product.imagen} alt={product.nombre} />
                </div>
                <div className={s.condicion}>{product.condicion}</div>
              </div>
              <hr style={{ height: '90%', margin: '20px' }} />

              <div style={{ maxWidth: '60%' }}>
                <h1>{product.nombre}</h1>

                <h4 className={s.descripcion_producto}>{product.descripcion_producto}</h4>

                <div className={s.precios}>
                  <h2 className={s.valor_normal}>${product.valor_normal}</h2>
                  <h1 className={s.valor_con_descuento}>${product.valor_con_descuento}</h1>
                </div>

                <div>
                  <h4>Selecciona la cantidad</h4>
                  {product.existencia !== 1
                    ? (<span style={{ color: "gray" }}>({product.existencia} disponibles)</span>)
                    : (<span style={{ color: "gray" }}>({product.existencia} disponible)</span>)}
                  <QuantityDisplay
                    quantity={quantity}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                  />
                </div>

                <div style={{ margin: '15px' }}>
                  <button style={{ width: '250px' }} onClick={handlerComprar}>Comprar</button>
                  <button style={{ width: '250px' }} onClick={handlerCarrito}>Agregar al carrito</button>
                </div>

              </div>
            </div>
          </div>

          <div className={s.box2}>
            <div className={s.box2Hijo}>
              <CardsReviews />
            </div>
          </div>

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
              <input
                className={s.input}
                type="text"
                value={descripcion_motivo}
                onChange={(e) => setDescripcion_motivo(e.target.value)}
              />
              <button className={s.btn} type='submit'>Enviar</button>
            </form>
          </div>
        </div>
        )}
    </>
  )
}

export default Detail

