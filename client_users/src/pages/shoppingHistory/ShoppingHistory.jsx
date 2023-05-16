// 
import React, { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Modal from 'react-modal';
import axios from 'axios';
import Detail from "../detail/Detail";
import Review from "./Review";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// ESTILOS
import s from "./ShoppingHistory.module.css";
import Loader from "../../components/loader/loader";
import { useHistory } from "react-router-dom";

Modal.setAppElement('#root'); // le decimos a react-modal que nuestro componente principal es #root

const HistorialDeCompra = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({})
  const [emailData, setEmailData] = useState({})
  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;
  console.log(1, email);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:3001/email?email=${email}`);
      const idUsuario = response.data[0].user_id;
      console.log(3, idUsuario);
      setTimeout(async () => {
        const response2 = await axios.get(`http://localhost:3001/venta/${idUsuario}`);
        const ventas = response2.data;
        console.log(3, ventas);
        if (ventas.length > 0) {
          setLoader(true)
          setUserData(ventas);
          setEmailData(email);
        }
      }, 1000);
    })();
  }, [dispatch, email, setUserData]);


  const dataUsuario = userData[0];
  console.log(4, dataUsuario);
  // console.log(5,dataUsuario.estado);

  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toggleModal = (id) => {
    setShowModal(!showModal);
    setSelectedDetail(id);
  };


  const [showModalReview, setShowModalReview] = useState(false);
  const [selectCalificar, setSelectCalificar] = useState(null);

  const toggleModalReview = (email, id) => {
    setShowModalReview(!showModalReview);
    setSelectCalificar({ email, id });
  };
  //fecha corta
  const newData = (data) => {
    console.log(data);
    const fecha = new Date(data);
    const opcionesDeFormato = { day: 'numeric', month: 'short' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato)
    .replace(/ /g, '-')
    .toUpperCase()
    return `${fechaFormateada.slice(0,4)}${fechaFormateada.slice(4).toLowerCase()}`
  };

  //Boton atrás
  const history = useHistory();
  const handlerBack = () =>{
    history.goBack();
  };

const [loader, setLoader] = useState(false)
  return (
    <>
      {!loader ? 
        <Loader/>  : (
          <div className={s.contenedor}>
            <div className={s.back} onClick={handlerBack}>
              <FontAwesomeIcon icon={faArrowLeft}  style={{color:"grey"}}/>
            </div>
            <div className={s.tabla}>
              <div className={s.titulo}>
                <h1>Mis compras</h1>
              </div>
              {userData.length > 0 ? (
                <div>
                  {userData.map((venta) => (
                    <div key={venta.id_orden} style={{border: "solid rgb(200, 197, 197) 1px",  margin: "25px 0px 25px 0px", borderRadius:"3px"}}>
                      <div style={{margin: "20px", display:"flex", justifyContent:"space-between"}}>
                        <div style={{margin: "0 0 0 40px"}}>
                          <h3>{newData(venta.fecha)}</h3>
                        </div>
                        <div>
                          {venta.estado 
                          ? <h3 className={s.success}>Compraste {<FontAwesomeIcon icon={faCheckCircle} />}</h3> 
                          : <h3 className={s.failure}>Compra cancelada <FontAwesomeIcon icon={faTimesCircle} /></h3>}
                        </div>
                      </div>
                      <>
                        {venta.productos.map((detalle) => (
                          <div>
                            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                              <div className={s.detalle} key={detalle.id_producto}>
                                <div className={s.divLink} >
                                  <img className={s.img} src={detalle.image} alt={detalle.name} onClick={() => toggleModal(detalle.id)} />
                                </div>
                                <h3 className={s.aux}>{detalle.name}</h3>
                                {venta.estado ? <button className={s.btnReview} onClick={() => toggleModalReview(email, detalle.id)}>Calificar</button>: null}
                                <p className={s.aux}>${detalle.valor_unitario} x unidad</p>
                                {detalle.cantidad === 1
                                ? <p className={s.aux}>{detalle.cantidad} unidad</p>
                                : <p className={s.aux}>{detalle.cantidad} unidades</p>}
                                <h3 className={s.aux}>SubTotal ${detalle.valor_total}</h3>
                                {/* {showProfileMenu && <Review id={detalle.id} email={email} mostrarProp={true} />} */}
                              </div>
                            </div>
                            {/* <div style={{display:"flex", justifyContent:"center"}}>
                            </div> */}
                          </div>
                          ))}
                          <div style={{display: "flex", justifyContent: "center"}}>
                            <div style={{width: "90%", border: "solid rgb(200, 197, 197) 1px",  margin: "10px 0px 25px 0px", borderRadius:"3px", display:"flex", justifyContent: "space-between"}}>
                              <h3 style={{ fontSize: "30px", margin:"0 0 0 20px" }}>Total</h3>
                              <h3 style={{ fontSize: "30px", margin:"0 20px 0 0" }}>${venta.total}</h3>
                            </div>
                          </div>
                      </>
                    </div>
                  ))}

                  {/* Ventana emergente del detalle de la compra */}
                  <Modal
                    isOpen={showModal}
                    onRequestClose={toggleModal}
                    className={s.modal}
                    overlayClassName={s.modalOverlay}
                  >
                    {selectedDetail && <Detail id={selectedDetail} />}
                    <button className={s.btnClose} onClick={toggleModal}>
                      CERRAR
                    </button>
                  </Modal>

                  <Modal
                    isOpen={showModalReview}
                    onRequestClose={toggleModalReview}
                    className={s.modal}
                    overlayClassName={s.modalOverlay}
                  >
                    {selectCalificar && <Review id={selectCalificar.id} email={selectCalificar.email} />}
                    <button className={s.btnCloseReview} onClick={toggleModalReview}>
                      CERRAR
                    </button>
                  </Modal>

                </div>
              ) : (
                <p>No se encontraron compras realizadas por el usuario</p>
              )}

            </div>
          </div>
      )}
    </>
  );

};

export default HistorialDeCompra; 
