import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import QuantityDisplay from '../../components/quantityDisplay/QuantityDisplay'
import { agregarAlCarrito, getProductById, cleanProduct, getReviews, cleanReviews, agregarCount } from '../../redux/actions'
import { Redirect } from "react-router-dom";
import s from './Detail.module.css'
import swal from 'sweetalert'
import CardsReviews from "../../components/cardsReviews/CardsReviews"
import Loader from '../../components/loader/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios'


const Detail = (props) => {

  const { product, carrito, countCarrito } = useSelector(state => state)

  const  product_id  = props.id

  const { id } = useParams()
  const dispatch = useDispatch();
  const estaLogueado = localStorage.getItem("estaLogueado");

  // const URL = 'http://localhost:3001'

  useEffect(() => {
    dispatch(getProductById(product_id?  product_id: id ))
    dispatch(getReviews(product_id?  product_id: id))
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    return (() => {
      dispatch(cleanProduct())
      dispatch(cleanReviews())
    })
  }, [dispatch, id, carrito, countCarrito])

  //Cuando se agrega al carrito
  const handlerCarrito = () => {
    const exists = carrito?.find(e => {
      return e.product_id === product.product_id
    })


   if(estaLogueado === "database" || estaLogueado === "google"){
    if(!exists){
      dispatch(agregarAlCarrito(product, quantity))
      dispatch(agregarCount(quantity))
       swal({
         title: `Agregaste ${product.name}`,
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
  };  
  
  // Cantidad de articulos
  const [quantity, setQuantity] = useState(1);

  //Botones para sumar/restar cantidad

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity !== product.stock) {
      setQuantity(quantity + 1);
    } else {
      swal({
        title: 'Número máximo de unidades disponibles',
        icon: 'info'
      })
    }
  };

  //Boton comprar ahora
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handlerComprar = () => {
    const exists = carrito?.find(e => {
      return e.product_id === product.product_id
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
  };

//Boton atrás
  const history = useHistory();
  const handlerBack = () =>{
    history.goBack();
  };

  return (
    <>
      {product.length === 0 ? (
        <Loader />
        ) : (
        <div className={s.a}>
          {carrito && shouldRedirect
            ? <Redirect to="/shopping-cart" />
            : (
            <div>
                <div className={s.box1}>
                  <div className={s.container}>
                    <div style={{ position: "relative" }}>
                      <div className={s.container_img}>
                        <img className={s.image} src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <hr style={{ height: '90%', margin: '20px' }} />

                    <div style={{ maxWidth: '60%' }}>
                      <h2>{product.name}</h2>

                      <p className={s.descripcion_producto}>{product.description}</p>

                      <div className={s.precios}>
                        <h2 className={s.valor_normal}>${product.normal_price}</h2>
                        <h1 className={s.valor_con_descuento}>${product.discount_price}</h1>
                      </div>

                      <div>
                        <h4>Selecciona la cantidad</h4>
                        {product.stock !== 1
                          ? (<span style={{ color: "gray" }}>({product.stock} disponibles)</span>)
                          : (<span style={{ color: "gray" }}>({product.stock} disponible)</span>)}
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
                  <div className={s.back} onClick={handlerBack}>
                    <FontAwesomeIcon icon={faArrowLeft}  style={{color:"grey"}}/>
                  </div>
                </div>

                <div className={s.box2}>
                  <div className={s.box2Hijo}>
                    <CardsReviews />
                  </div>
                </div>

                  {/* <div style={{marginBottom: '50px'}}>
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
                  </div> */}
            </div>
            )}
        </div>
      )}
    </>
  )
}

export default Detail

