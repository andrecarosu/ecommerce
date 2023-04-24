
const { loginCommerce } = require('../../controllers/comercios/loginController');

const loginHandler = async (req, res, next) => {
    const commerce = req.body;
    console.log("COMMERCE HANDLER: ", commerce);

    try {
        const controller = await loginCommerce(commerce, res);
        res.status(200).send(controller);
    } catch (error) {

        res.status(401).send({ error: error.message }); // Utilizar el mensaje del error arrojado desde loginUser

    }
};

module.exports = {
    loginHandler
};

