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
                    En la ruta /dashboard se mostrará sobre la derecha un menu lateral, en la parte superior mostrará una imagen con la primera letra del nombre del usuario. Luego se mostraran 4 opciones de rutas menu, usuarios, productos y ventas. En la parte inferior se mostrará un para cerrar la cesión del usuario. <br />
                    <br />
                    En la opción de usuario se mostrará un listado donde apareceran las siguientes carascteristicas: El nombre del usuario, el email con el que se ha registrado, su dirección particular y la fecha cuando creó la cuenta. <br />
                    <br />
                    En la opcion de productos se mostrará el listado de los productos, donde apareceran las siguientes caracteristicas nombre, imagen, precio, categoria, stock, fecha de creacion, la opcion de editar al producto y el estado. Si haces click sobre Productos apareceran dos nuevas opciones, categorías donde apareceran los principales varietales de vino y ver calificaciones donde se mostrara un promedio de las calificaciones que le dieron los usuarios a cada vino y si el usuario comenta una opinion.<br />
                    En esta ruta estaran disponibles los filtros para la obtencion de los productos, se pueden filtrar por orden alfabetico, tanto ascendente como descendente, se pueden filtrar por nombre a traves de una barra de busqueda, se pueden filtrar por precio tanto ascendente como descendente y tambien se puede filtrar por la categoria del producto. <br />
                    Otra funcion que se puede realizar es editar el producto, se puede cambiar el nombre del producto, el precio, el precio de descuento si esta de oferta, la imagen, la marca, la categoria, el stock y la descripción.
                    Tambien esta disponible la posibilidad de deshabilitar el producto si este se encuentra sin stock para que no se muestre en el inicio. <br />
                    <br />

                    En la opción ventas se va a mostrar las compras hechas por el usuario, cada registro de la tabla corresponde a la orden de la venta. Se muestra el id de la orden, el total, la fecha en la que se hizo y el usuario que lo hizo. En state muestra si la venta fue fallida o exitosa. Al seleccionar un registro se desplega el detalle de la orden, indicando los productos que compró, el id de producto, la cantidad que compró de cada producto, el precio unitario y el precio total. Si oprime en el nombre de cualquier producto va a poder ver el detalle del producto. <br />
                    <br />
                    Muchas gracias por su atencion, espero que haya sido de su utilidad.
                </p>
            </div>
        </div>
    );
}

export default Menu;
