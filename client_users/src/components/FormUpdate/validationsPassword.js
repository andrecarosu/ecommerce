const regexPassword = /^(?=.*?[a-z0-9])(?=.*?[a-z0-9]).{6,10}$/ // Password al menos un número
const blankSpace = /^\s+$/ // Espacio en blanco

export default function validations(values) {
    const errors = {}

    if (values.password && values.password.length > 0 && values.password.length < 8) errors.password = 'La contraseña debe tener más de 8 caracteres'
     if (values.password && values.password.length > 20) errors.password = 'La contraseña no debería tener más de 20 caracteres'
     if (values.password && !/(?=.*\d).+/.test(values.password)) errors.password = 'La contraseña debe contener al menos un número';
    if (!values.password) errors.password = 'Campo Requerido';
    if (values.password && blankSpace.test(values.password)) errors.password = 'La contraseña no puede ser un espacio en blanco'


    if (!values.confirmPassword) errors.confirmPassword = 'Debes confirmar la contraseña'
    if (values.password && values.password !== values.confirmPassword) errors.confirmPassword = 'las contraseñas no son iguales'
     
    return errors
}