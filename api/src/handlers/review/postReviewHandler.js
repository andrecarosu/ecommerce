const {
    createReview,
} = require("../../controllers/review/postReviewController");
const handlerHttpError = require('../../middlewares/handlerHttpError')

const postReviewHandler = async (req, res) => {
    const review = req.body
    try {
        await createReview(review)
        res.status(200).send('Nueva calificacion agregada')

    } catch (error) {
        handlerHttpError(res, error.message, 500)
    }

}

module.exports = { postReviewHandler }