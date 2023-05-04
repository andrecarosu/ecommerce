const { putReviewController, deleteComment } = require('../../controllers/review/putReviewController')
const handlerHttpError = require('../../middlewares/handlerHttpError')

const putReviewHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const params = req.body

        const controller = await putReviewController({ id, ...params })
        res.status(201).send(controller)

    } catch (error) {
        handlerHttpError(res, 500, error.message)
    }
}

const deleteCommentHandler = async (req, res, next) => {
    try {
        const { id, comment_id } = req.params
        const controller = await deleteComment({ id, comment_id })
        res.status(201).send(controller)

    } catch (error) {
        handlerHttpError(res, error.message, 500)
    }
}

module.exports = { putReviewHandler, deleteCommentHandler }