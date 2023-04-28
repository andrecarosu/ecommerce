const { Router } = require('express')
const { getCategoriesHandler } = require('../handlers/categories/getCategoriesHandler')
const { postCategoryHandler } = require('../handlers/categories/postCategoriesHandler')



const router = Router()

router.get('/', getCategoriesHandler)
router.post('/', postCategoryHandler)

module.exports = router