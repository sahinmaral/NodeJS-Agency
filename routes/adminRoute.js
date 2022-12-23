const express = require('express')

const adminController = require('../controllers/adminController')

const router = express.Router()

router.route('/').get(adminController.getIndexPage)
router.route('/products').get(adminController.getProductsPage)
router.route('/products/delete/:id').post(adminController.deleteProduct)

module.exports = router