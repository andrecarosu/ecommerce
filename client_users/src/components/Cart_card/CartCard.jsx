import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteCount, eliminarDelCarrito, restarCantidad, restarCount, sumarCantidad, sumarCount } from "../../redux/actions"
import QuantityDisplay from "../quantityDisplay/QuantityDisplay";
import swal from "sweetalert";
import s from "./cartcard.module.css";

export default function CartCard(product) {
  const dispatch = useDispatch();

  function handleEliminarProducto() {
    dispatch(eliminarDelCarrito(product));
    dispatch(deleteCount(product.amount))
  }

  const [quantity, setQuantity] = useState(product.amount);

  const handleDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
      dispatch(restarCantidad(product));
      dispatch(restarCount())
    }
  };

  const handleIncrease = () => {
    if (quantity !== 10) {
      setQuantity(quantity + 1);
      dispatch(sumarCantidad(product))
      dispatch(sumarCount())
    } else {
      swal({
        title: 'Número máximo de unidades disponibles',
        icon: 'info'
      })
    }
  };

  return (
    <div >
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div className={s.container}>
              <div className={s.image}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={s.text}>
                <h3 className={s.name}>{product.name}</h3>
              </div>
              <div className={s.precio}>${product.discount_price} x unidad</div>
              <div className={s.quantity}>
              <QuantityDisplay
                quantity={product.amount}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
              </div>
              <div>
                <h3 style={{fontSize: "25px"}}>Subtotal ${product.discount_price*product.amount}</h3>
              </div>
              <div className={s.eliminar} onClick={handleEliminarProducto}>
                <IoTrashBinOutline size={20} />
              </div>
            </div>
          </div>
          <div style={{display:"flex", justifyContent: "center"}}>
            <hr style={{width:"90%"}}/>
          </div>
    </div>      
  );
}
