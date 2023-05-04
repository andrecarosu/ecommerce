const { Router } = require('express')
const { getCategoriesHandler, getFamiliesHandler } = require('../handlers/categories/getCategoriesHandler')
const { postCategoryHandler } = require('../handlers/categories/postCategoriesHandler')



const router = Router()

router.get('/', getCategoriesHandler)
router.get('/families', getFamiliesHandler)
router.post('/', postCategoryHandler)

module.exports = router