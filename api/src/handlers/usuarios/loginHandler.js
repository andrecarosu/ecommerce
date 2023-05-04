// const { loginUser } = require('../../controllers/usuarios/loginController')

// const loginHandler = async (req, res, next) => {
//     const user = req.body
//     console.log("USER HANDLER:  " ,user)
//     try {
//         const controller = await loginUser(user)
//         res.status(200).send(controller)
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = {
//     loginHandler
// }


const { loginUser } = require('../../controllers/usuarios/loginController');

const loginHandler = async (req, res, next) => {
    const user = req.body;
    console.log("USER HANDLER: ", user);

    try {
        const controller = await loginUser(user, res);
        res.status(200).send(controller);
    } catch (error) {

        res.status(401).send({ error: error.message }); // Utilizar el mensaje del error arrojado desde loginUser

    }
};

module.exports = {
    loginHandler
};



