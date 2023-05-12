const blankSpace = /^\s+$/ // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i // Email válido
//const regexPassword = /^(?=.*?\d)[a-zA-Z0-9]{6,10}$/; // Password al menos un número
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
//const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
const regexphone = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}

    if (!values.name) errors.name = 'Campo Requerido'
    if (values.name && blankSpace.test(values.name)) errors.name = 'El nombre no puede empezar con un espacio en blanco'
    if (values.name && values.name.length > 51) errors.name = 'Los nombres no deberían sumar más de 50 caracteres'
    if (values.name && values.name && !regexLetters.test(values.name)) errors.name = 'Tu nombre no puede contener número ni símbolos'
    if (values.name &&  values.name.length < 3) errors.name = 'Los nombres no deben tener menos de 3 caracteres';

    

    if (!values.address) errors.address = 'Campo Requerido'
    if (values.address && blankSpace.test(values.address)) errors.address = 'La dirección no puede empezar con  un espacio en blanco'
    if (values.address && !/^(?=.*[0-9])(?=.*[a-zA-Z])/.test(values.address)) errors.address = 'La dirección de tener números y letras'
    if (values.address && values.address.length > 101) errors.address = 'La dirección no debería sumar más de 100 caracteres'
    if (values.address && values.address.length > 0 && values.address.length < 4) errors.address = 'La dirección no debería tener menos de 4 caracteres'


    if (!values.phone) errors.phone = 'Campo Requerido'
    if (values.phone && values.phone.length > 0 && values.phone.length < 9) errors.phone = 'El teléfono no debería contener menos de 9 caracteres'
    if (values.phone && !regexphone.test(values.phone)) errors.phone = "El teléfono debe contener solo numeros"
    if (values.phone && values.phone.length > 25) errors.phone = 'El +teléfono no debería sumar más de 25 caracteres'

    if (!values.email) errors.email = 'Campo Requerido'
    if (values.email && !regexEmail.test(values.email)) errors.email = 'Por favor ingresa un email válido'
    if (values.email && blankSpace.test(values.email)) errors.email = 'El email no puede ser un espacio en blanco'
    if (values.email && values.email.length > 30) errors.email = 'El email no debería contener más de 30 caracteres'

     if (values.password && values.password.length > 0 && values.password.length < 8) errors.password = 'La contraseña debe tener más de 8 caracteres'
     if (values.password && values.password.length > 20) errors.password = 'La contraseña no debería tener más de 20 caracteres'
     if (values.password && !/(?=.*\d).+/.test(values.password)) errors.password = 'La contraseña debe contener al menos un número';
    if (!values.password) errors.password = 'Campo Requerido';

    if (!values.city) errors.city = 'Campo Requerido'
    if (values.city && blankSpace.test(values.city)) errors.city = 'La Ciudad no puede empezar con  un espacio en blanco'
    if (values.city && values.city && !regexLetters.test(values.city)) errors.city = 'La ciudad no puede contener números ni símbolos'
    if (values.city && values.city.length > 40) errors.city = 'La Ciudad no debería sumar más de 40 caracteres'
    if (values.city && values.city.length > 0 && values.city.length < 4) errors.city = 'La Ciudad no debería tener menos de 4 caracteres'


    return errors
}