const { Comercio } = require("../../db");
const bcrypt = require("bcrypt");
const { generateToken } = require('./generateToken');
const cookie = require('cookie');

const loginCommerce = async (commerce, res) => { // Añadir el parámetro "res" para la respuesta HTTP
console.log(commerce)

    try {
        const db_commerce = await Comercio.findOne({
            where: {
                email: commerce.email,
            }
        })
   console.log("asd: ", db_commerce)

   const admin = await Comercio.findOne({
    where: {
        email: commerce.email,
        admin:true
    }
})

        if (db_commerce || admin) {
            const passwordMatch = await bcrypt.compare(commerce.password, db_commerce.password);
            if (passwordMatch) {
                const token = generateToken(db_commerce);

                // Crear una cookie con el token y la sesión de usuario
                res.setHeader('Set-Cookie', [
                    cookie.serialize('commerce_token', token, { 
                        httpOnly: true, // La cookie solo puede ser accedida por el servidor
                        maxAge: 3600, // Tiempo de vida de la cookie en segundos (1 hora en este ejemplo)
                        path: '/' // Ruta del servidor en la que la cookie es válida
                    }),
                    cookie.serialize('commerce_session', JSON.stringify(db_commerce), {
                        httpOnly: true,
                        maxAge: 3600,
                        path: '/'
                    })
                ]);

                return {
                    msg: 'Login success',
                    session: {
                        ...db_commerce,
                    },
                    token: token
                }
            } else {
                throw new Error('Invalid email or password')
            }
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        console.log(error);
        throw error; // Propaga el error para que pueda ser manejado en la capa de manejo de errores del servidor
    }
}

module.exports = {
    loginCommerce
}
