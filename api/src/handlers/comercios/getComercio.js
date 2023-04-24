const { getCommerce, getOneCommerce, searchNameCommerce, searchEmailCommerce, getCommerceId } = require("../../controllers/comercios/getComercioController")


const getAllCommerceHandler = async (req, res, next) => {

    try {
        const results = await getCommerce()

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getByNameHandler = async (req, res, next) => {
    const { nombre } = req.query;

    try {
        const results = await searchNameCommerce(nombre)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}


const getByEmailHandler = async (req, res, next) => {
    const { email } = req.query;

    try {
        const results = await searchEmailCommerce(email)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getByIdHandler = async (req, res, next) => {
    const { id_comercio } = req.params;

    try {
        const results = await getCommerceId(id_comercio)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const loginCommerce = async (req, res, next) => {
    const { email, password } = req.query;
    try {
        const results = await getOneCommerce(email, password)

        if (results === null) {
            res.status(300).send({ data: "el email o contraseña no coinciden" })
        }
        else {

            res.status(200).json(results)
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCommerceHandler, getByNameHandler, getByEmailHandler, getByIdHandler, loginCommerce
}