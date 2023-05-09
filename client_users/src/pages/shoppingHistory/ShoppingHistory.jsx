// 
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';
import Detail from "../detail/Detail";
import Review from "./Review";
// ACTIONS
import { getSales, getUsuarioByEmail } from "../../redux/actions";
// ESTILOS
import s from "./ShoppingHistory.module.css";

Modal.setAppElement('#root'); // le decimos a react-modal que nuestro componente principal es #root

const HistorialDeCompra = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({})
  const [emailData, setEmailData] = useState({})
  const usuario = useSelector((state) => state.usuario) ?? [];
  const compras = useSelector((state) => state.compras) ?? [];
  const token = Cookies.get("user_token");
  const decodedToken = jwt_decode(token);

  const email = decodedToken.email;
  console.log(1, email);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://deploynodejsecommerce.onrender.com/email?email=${email}`);
      const idUsuario = response.data[0].user_id;
      console.log(3, idUsuario);
      setTimeout(async () => {
        const response2 = await axios.get(`https://deploynodejsecommerce.onrender.com/venta/${idUsuario}`);
        const ventas = response2.data;
        console.log(3, ventas);
        if (ventas.length > 0) {
          setUserData(ventas);
          setEmailData(email);
        }
      }, 4000);
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


  return (
    <div className={s.contenedor}>
      <div className={s.tabla}>
        <div className={s.titulo}>
          <h1>Historial de compras:</h1>
        </div>
        {userData.length > 0 ? (
          <div>
            {userData.map((venta) => (
              <div key={venta.id_orden}>
                <h3>Compra realizada el {venta.fecha}</h3>
                <label className={s.total}>Total Venta: ${venta.total}</label>
                {venta.estado ? <label className={s.aux}>Venta Exitosa</label> : <label className={s.aux}>Venta Fallida</label>}
                {venta.estado ?
                  venta.productos.map((detalle) => (
                    <div>
                      <div className={s.detalle} key={detalle.id_producto}>
                        <label className={s.aux}>Producto: {detalle.name}</label>
                        <div className={s.divLink} >
                          {/* <Link className={s.link} to={`/detail/${detalle.id_producto}`}>
            <img className={s.img} src={detalle.image} alt={detalle.name}  onClick={() => toggleModal(detalle.id_producto)}  />
            </Link> */}
                          <img className={s.img} src={detalle.image} alt={detalle.name} onClick={() => toggleModal(detalle.id_producto)} />

                        </div>
                        <label className={s.aux}>Valor Unitario: {detalle.valor_unitario}</label>
                        <label className={s.aux}>Cant: {detalle.cantidad}</label>
                        <label className={s.aux}>Valor Total  $: {detalle.valor_total}</label>
                        {/* {showProfileMenu && <Review id={detalle.id} email={email} mostrarProp={true} />} */}
                      </div>
                      <button className={s.btnReview} onClick={() => toggleModalReview(email, detalle.id)}>Calificar</button>
                    </div>
                  ))
                  : venta.productos.map((detalle) => (
                    <div className={s.detalle} key={detalle.id_producto}>
                      <label className={s.aux}>Producto: {detalle.name}</label>
                      <div className={s.divLink} >
                        {/* <Link className={s.link} to={`/detail/${detalle.id}`}> */}
                        <img className={s.img} src={detalle.image} alt={detalle.name} onClick={() => toggleModal(detalle.id)} />
                        {/* </Link> */}
                      </div>
                      <label className={s.aux}>Valor Unitario: {detalle.valor_unitario}</label>
                      <label className={s.aux}>Cant: {detalle.cantidad}</label>
                      <label className={s.aux}>Valor Total  $: {detalle.valor_total}</label>
                    </div>
                  ))}
              </div>
            ))}

            {/* Ventana emergente del detalle de la compra */}
            <Modal
              isOpen={showModal}
              onRequestClose={toggleModal}
              className={s.modal}
              overlayClassName={s.modalOverlay}
            >
              {selectedDetail && <Detail id={selectedDetail.id} />}
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
  );

};

export default HistorialDeCompra; 
