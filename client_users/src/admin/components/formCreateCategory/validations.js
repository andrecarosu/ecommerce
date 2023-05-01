const regexTelefono = /^[0-9]+$/; // valida solo numeros
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/ // Solo letras
const blankSpace = /^\s+$/ // Espacio en blanco



export default function validation(values) {
    const errors = {}

    if (!values.nombre) errors.nombre = 'Campo requerido'
    // if (!values.cantidad) errors.cantidad = 'Campo requerido'

    if (values.nombre.length > 51) errors.nombre = 'Los nombres no deberían sumar más de 50 caracteres'
    if (values.nombre && !regexLetters.test(values.nombre)) errors.nombre = 'El nombre puede contener solo letras y numeros'
    if (values.nombre.length === 1 && values.nombre.length < 3) errors.nombre = 'Los nombres no deben tener menos de 3 caracteres'; 
    
    if (values.descripcion_producto.length > 401) errors.descripcion_producto = 'La descripcion no debería sumar más de 400 caracteres'
    if (values.descripcion_producto && !regexLetters.test(values.descripcion_producto)) errors.descripcion_producto = 'La descripcion puede contener solo letras y numeros'
    if (values.descripcion_producto.length === 1 && values.descripcion_producto.length < 10) errors.descripcion_producto = 'La descirpcion no deben tener menos de 10 caracteres'; 
    
    
    if (!values.descripcion_producto) errors.descripcion_producto = 'Campo requerido'
    if (!values.existencia) errors.existencia = 'Campo requerido'
    if (!values.fecha_final) errors.fecha_final = 'Campo requerido'
    if (!values.fecha_inicial) errors.fecha_inicial = 'Campo requerido'
    if (!values.imagen) errors.imagen = 'Campo requerido'
    if (!values.valor_normal) errors.valor_normal = 'Campo requerido'
    if (!values.valor_con_descuento) errors.valor_con_descuento = 'Campo requerido'
    if(!values.id_categoria_producto) errors.id_categoria_producto ='Campo requerido'
    if (!values.condicion) errors.condicion= 'Debe igresar entre: Nuevo, Usado, Reacondicionado'    
    // if (values.cantidad === 0) {
    //     errors.cantidad = "Por favor ingrese la cantidad";
    // }
    if (values.valor_normal === 0) {
        errors.valor_normal = "Por favor ingrese el valor del producto";
    }
    if (values.existencia === 0) {
        errors.existencia = "Por favor ingrese la existencia";
    }
    return errors
}

