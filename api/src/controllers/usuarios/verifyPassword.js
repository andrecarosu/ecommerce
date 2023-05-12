const { User } = require("../../db");
const bcrypt = require("bcrypt");
const { generateToken } = require('./generateToken');
const cookie = require('cookie');

const verifyPassword = async (user_id, matchPassword) => {
    try {
        const user = await User.findByPk(user_id)

        if (user) {
            console.log(user)
            const passwordMatch = await bcrypt.compare(matchPassword, user.password);
            if (passwordMatch) {
                return { succesfull: 'La contraseña es correcta' }
            } else {
                throw new Error('La contraseña es incorrecta')
            }
        } else {
            throw new Error('Usuario no encontrado')
        }
    } catch (error) {
        console.log('here', error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    verifyPassword
}
