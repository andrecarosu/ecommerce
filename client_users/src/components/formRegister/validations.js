const blankSpace = /^\s+$/ // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i // Email válido
//const regexPassword = /^(?=.*?\d)[a-zA-Z0-9]{6,10}$/; // Password al menos un número
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/ // Solo letras
//const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; // valida la dirección
const regexphone = /^[0-9]+$/;

export default function validations(values) {
    const errors = {}

    if (!values.name) errors.name = 'Campo requerido'
    if (values.name && blankSpace.test(values.name)) errors.name = 'No debe empezar con un espacio';
    if (values.name && values.name.length > 51) errors.name = 'No debe tener más de 50 carácteres';
    if (values.name && values.name && !regexLetters.test(values.name)) errors.name = 'No debe contener números ni símbolos';
    if (values.name &&  values.name.length < 4) errors.name = 'No debe tener menos de 3 carácteres';

    if (!values.surname) errors.surname = 'Campo requerido'
    if (values.surname && blankSpace.test(values.surname)) errors.surname = 'No debe empezar con un espacio';
    if (values.surname && values.surname.length > 51) errors.surname = 'No debe tener más de 50 carácteres';
    if (values.surname && values.surname && !regexLetters.test(values.surname)) errors.surname = 'No debe contener números ni símbolos';
    if (values.surname &&  values.surname.length < 3) errors.surname = 'No debe tener menos de 3 carácteres';

    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const ninetyFiveYearsAgo = new Date(currentDate.getFullYear() - 95, currentDate.getMonth(), currentDate.getDate());
    const dateOfBirth = new Date(values.date);
    if (dateOfBirth > eighteenYearsAgo) errors.date = 'Debes ser mayor a 18 años';
    if (dateOfBirth < ninetyFiveYearsAgo) errors.date = 'No puedes superar los 95 años';
      

    if (!values.address) errors.address = 'Campo requerido'
    if (values.address && blankSpace.test(values.address)) errors.address = 'No debe empezar con un espacio';
    if (values.address && !/^(?=.*[0-9])(?=.*[a-zA-Z])/.test(values.address)) errors.address = 'Debe tener números y letras';
    if (values.address && values.address.length > 101) errors.address = 'No debe tener más de 100 carácteres';
    if (values.address && values.address.length > 0 && values.address.length < 4) errors.address = 'No debe tener menos de 4 carácteres';


    if (!values.phone) errors.phone = 'Campo requerido'
    if (values.phone && values.phone.length > 0 && values.phone.length < 9) errors.phone = 'No debe tener menos de 9 carácteres';
    if (values.phone && !regexphone.test(values.phone)) errors.phone = "Debe contener solo numeros";
    if (values.phone && values.phone.length > 26) errors.phone = 'No debe tener mas de 25 carácteres';

    if (!values.email) errors.email = 'Campo requerido';
    if (values.email && !regexEmail.test(values.email)) errors.email = 'Debe ser un email válido';
    if (values.email && blankSpace.test(values.email)) errors.email = 'No debe ser un espacio en blanco';
    if (values.email && values.email.length > 51) errors.email = 'No debe tener mas de 50 carácteres';

    if (values.password && values.password.length > 0 && values.password.length < 8) errors.password = 'Debe tener más de 8 carácteres';
    if (values.password && values.password.length > 31) errors.password = 'No debe tener más de 30 carácteres';
    if (values.password && !/(?=.*\d).+/.test(values.password)) errors.password = 'Debe contener al menos un número';
    if (!values.password) errors.password = 'Campo requerido';

    if (values.password !== values.repeatPassword) errors.repeatPassword = "Las contraseñas no coinciden";
    if (values.repeatPassword && values.repeatPassword.length > 0 && values.repeatPassword.length < 8) errors.repeatPassword = 'Debe tener más de 8 carácteres';
    if (values.repeatPassword && values.repeatPassword.length > 31) errors.repeatPassword = 'No debe tener más de 30 carácteres';
    if (values.repeatPassword && !/(?=.*\d).+/.test(values.repeatPassword)) errors.repeatPassword = 'Debe contener al menos un número';
    if (!values.repeatPassword) errors.repeatPassword = 'Campo requerido';

    if (!values.city) errors.city = 'Campo requerido'
    if (values.city && blankSpace.test(values.city)) errors.city = 'No debe empezar con un espacio';
    if (values.city && values.city && !regexLetters.test(values.city)) errors.city = 'No debe contener números ni símbolos';
    if (values.city && values.city.length > 41) errors.city = 'No debe tener más de 40 carácteres';
    if (values.city && values.city.length > 0 && values.city.length < 4) errors.city = 'No debe tener menos de 4 carácteres';


    return errors
}