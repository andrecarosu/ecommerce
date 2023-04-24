// const { Usuario } = require("../../db");
// const bcrypt = require("bcrypt");
// const { generateToken } = require('./generateToken')

// const loginUser = async (user) => {
//     console.log('SERVER_LOGIN', user)

//     try {
//         const db_user = await Usuario.findOne({
//             where: {
//                 email: user.email,
//             }
//         })

//         console.log("DB USER: " ,db_user)

//         if (db_user) {
//             if (bcrypt.compareSync(user.password, db_user.password)) {
//                 return {
//                     msg: 'Login success',
//                     session: {
//                         ...db_user,
//                     },
//                     token: generateToken(db_user)
//                 }
//             } else {
//                 throw new Error('Invalid email or password')
//             }
//         } else {
//             throw new Error('User not found')
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = {
//     loginUser
// }

const { Usuario } = require("../../db");
const bcrypt = require("bcrypt");
const { generateToken } = require('./generateToken');
const cookie = require('cookie');

const loginUser = async (user, res) => { // Añadir el parámetro "res" para la respuesta HTTP
    console.log('SERVER_LOGIN', user)

    try {
        const db_user = await Usuario.findOne({
            where: {
                email: user.email,
            }
        })

        console.log("DB USER: " ,db_user)

        if (db_user) {
            const passwordMatch = await bcrypt.compare(user.password, db_user.password);
            if (passwordMatch) {
                const token = generateToken(db_user);

                // Crear una cookie con el token y la sesión de usuario
                res.setHeader('Set-Cookie', [
                    cookie.serialize('user_token', token, { 
                        httpOnly: true, // La cookie solo puede ser accedida por el servidor
                        maxAge: 3600, // Tiempo de vida de la cookie en segundos (1 hora en este ejemplo)
                        path: '/' // Ruta del servidor en la que la cookie es válida
                    }),
                    cookie.serialize('user_session', JSON.stringify(db_user), {
                        httpOnly: true,
                        maxAge: 3600,
                        path: '/'
                    })
                ]);

                return {
                    msg: 'Login success',
                    session: {
                        ...db_user,
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
    loginUser
}
