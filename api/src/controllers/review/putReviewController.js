const { Product, Supplier, User, Review } = require("../../db");
const { Op } = require("sequelize")

const putReviewController = async ({ id, comment_id, scoring }) => {
    console.log(scoring)
    try {
        const existentReview = await Review.findByPk(id)
        if (!existentReview) {

        }
        await existentReview.update({ scoring })
        return

    } catch (error) {

    }
}

const deleteComment = async ({ id, comment_id }) => {
    try {
        const existentReview = await Review.findByPk(id)
        if (!existentReview) {
            throw new Error('No existe')
        }
        await existentReview.update({ comments: { comment_id } })
        return

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { putReviewController, deleteComment }