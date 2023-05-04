const regexTelefono = /^[0-9]+$/; // valida solo numeros
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/ // Solo letras
const blankSpace = /^\s+$/ // Espacio en blanco



export default function validation(values) {
    const errors = {}

    if (!values.name) errors.name = 'Campo requerido'
    // if (!values.cantidad) errors.cantidad = 'Campo requerido'

    if (values.name.length > 51) errors.name = 'Los names no deberían sumar más de 50 caracteres'
    if (values.name && !regexLetters.test(values.name)) errors.name = 'El name puede contener solo letras y numeros'
    if (values.name.length === 1 && values.name.length < 3) errors.name = 'Los names no deben tener menos de 3 caracteres';

    if (values.description.length > 401) errors.description = 'La descripcion no debería sumar más de 400 caracteres'
    if (values.description && !regexLetters.test(values.description)) errors.description = 'La descripcion puede contener solo letras y numeros'
    if (values.description.length === 1 && values.description.length < 10) errors.description = 'La descirpcion no deben tener menos de 10 caracteres';


    if (!values.description) errors.description = 'Campo requerido'
    if (!values.existencia) errors.existencia = 'Campo requerido'
    if (!values.fecha_final) errors.fecha_final = 'Campo requerido'
    if (!values.fecha_inicial) errors.fecha_inicial = 'Campo requerido'
    if (!values.imagen) errors.imagen = 'Campo requerido'
    if (!values.valor_normal) errors.valor_normal = 'Campo requerido'
    if (!values.valor_con_descuento) errors.valor_con_descuento = 'Campo requerido'
    if (!values.id_categoria_producto) errors.id_categoria_producto = 'Campo requerido'
    if (!values.condicion) errors.condicion = 'Debe igresar entre: Nuevo, Usado, Reacondicionado'
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

