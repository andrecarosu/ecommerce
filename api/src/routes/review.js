const { Router } = require('express')
const { postReviewHandler } = require("../handlers/review/postReviewHandler")
const { putReviewHandler, deleteCommentHandler } = require("../handlers/review/putReviewHandler")
const {getAllReviews} =require("../controllers/review/getReviewController")

const router = Router()

router.get('/:id',getAllReviews)
router.put('/:id', putReviewHandler)
router.put('/delete-comment/:id/:comment_id', deleteCommentHandler)
router.post('/', postReviewHandler)

module.exports = router