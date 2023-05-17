export default function validation(values) {
    const errors = {}

    if(!values.email) errors.email = 'Campo Requerido'
    if(!values.password) errors.password = 'Campo Requerido'

    return errors
}