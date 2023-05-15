import React from 'react';
// import Graphic from '../../components/graphic/graphic';
import S from "./Menu.module.css"

const Menu = () => {
    return (
        <div className={S.container}>
            <h1>Menu principal</h1>
            {/* <Graphic /> */}
            <div className={S.contentDescription}>
                <p>Hola, esta es una explicacion sencilla de como funciona el menu de administrador. <br />
                    <br />
                    En la ruta /dashboard se mostrará sobre la izquierda un menu lateral, en la parte superior mostrará una imagen con la primera letra del nombre del usuario.
                    Luego se mostraran 4 opciones: menú, usuarios, productos y ventas. En la parte inferior se mostrará un para cerrar la cesión del usuario. <br />
                    <br />
                    <ul>
                        <u>Usuario:</u> Mostrará un listado donde apareceran las siguientes carascteristicas:
                        <li className={S.contentDescription}>El nombre del usuario</li>
                        <li className={S.contentDescription}>El email con el que se ha registrado</li>
                        <li className={S.contentDescription}>Su dirección particular</li>
                        <li className={S.contentDescription}>La fecha cuando creó la cuenta</li>
                    </ul>
                    <br />

                    <u>Productos:</u>  Mostrará el listado de los productos, si haces click sobre Productos apareceran dos nuevas opciones, categorías donde apareceran los principales varietales de vino y ver calificaciones donde se mostrara un promedio de las calificaciones que le dieron los usuarios a cada vino y si el usuario comenta una opinion.<br />
                    <br />
                    En esta ruta estaran disponibles los filtros para la obtencion de los productos, se pueden filtrar por orden alfabetico, tanto ascendente como descendente, se pueden filtrar por nombre a traves de una barra de busqueda, se pueden filtrar por precio tanto ascendente como descendente y tambien se puede filtrar por la categoria del producto. <br />
                    <br />
                    Las caracteristicas de los productos que mostrará son:
                    <ul>
                        <li className={S.contentDescription}>Nombre</li>
                        <li className={S.contentDescription}>Imagen</li>
                        <li className={S.contentDescription}>Precio</li>
                        <li className={S.contentDescription}>Categoria</li>
                        <li className={S.contentDescription}>Stock</li>
                        <li className={S.contentDescription}>Fecha de creacion</li>
                        <li className={S.contentDescription}><u>Editar al producto:</u> Puede cambiar el nombre del producto, el precio, el precio de descuento si esta de oferta, la imagen, la marca, la categoria, el stock y la descripción del producto elegido.</li>
                        <li className={S.contentDescription}><u>Estado:</u> Dispone la posibilidad de deshabilitar el producto si este se encuentra sin stock para que no se muestre en el inicio. <br /></li>
                    </ul>
                    <br />

                    <u>Ventas:</u> Mostrará las compras hechas por el usuario, cada registro de la tabla corresponde a la orden de la venta. Se muestra:
                    <ul>
                        <li className={S.contentDescription}>El id de la orden</li>
                        <li className={S.contentDescription}>El total</li>
                        <li className={S.contentDescription}>La fecha en que se realizó </li>
                        <li className={S.contentDescription}>El usuario que la realizó </li>
                        <li className={S.contentDescription}>El estado: muestra si la venta fue fallida o exitosa. </li>
                    </ul>
                    Al seleccionar un registro se desplega el detalle de la orden, indicando los productos que compró, el id de producto, la cantidad que compró de cada producto, el precio unitario y el precio total. Si oprime en el nombre de cualquier producto va a poder ver el detalle del producto. <br />
                    <br />
                    Muchas gracias por su atencion, espero que haya sido de su utilidad.
                </p>
            </div>
        </div>
    );
}

export default Menu;
