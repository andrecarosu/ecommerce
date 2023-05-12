const blankSpace = /^\s+$/ // Espacio en blanco

export default function validations(values) {
    const errors = {}
    if (!values.comment) errors.comment = 'Campo Requerido'  
    if (values.comment && blankSpace.test(values.comment)) errors.comment = 'El comentario no puede empezar con un espacio en blanco'
    if (values.comment &&values.comment.length > 100) errors.comment = 'Los comentarios no deberían sumar más de 50 caracteres'
    if (values.comment && values.comment.length < 4) errors.comment = 'Los comentarios no deben tener menos de 4 caracteres'; 

    if (!values.scoring) errors.scoring = 'Campo Requerido'

     

    return errors
}