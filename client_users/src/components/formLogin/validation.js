export default function validation(values) {
    let errors = {}

    if(values.email &&!values.email) {
        errors.email = 'Ingrese un email'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(values.email)){
        errors.email = 'Ingrese un email válido'
    }
    if(values.password&&!values.password) errors.password = 'Ingrese una contraseña'
    console.log(errors.email, values.email);
    return errors
}