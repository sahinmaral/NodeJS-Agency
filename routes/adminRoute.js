const express = require('express')

const adminController = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const {validateAddAbout,validateUpdateAbout} = require('../middlewares/validator/aboutValidator')
const validateAdmin = require("../middlewares/validator/adminValidator")

const router = express.Router()

router.route('/login').post(validateAdmin,adminController.loginToAdminPanel)
router.route('/logout').get(adminController.logout)

//#region Products
router.route('/products/delete/:id').post(adminController.deleteProduct)
router.route('/products/add').post(adminController.addProduct)
router.route('/products/update').post(adminController.updateProduct)
//#endregion

//#region Abouts
router.route('/abouts/delete/:id').post(adminController.deleteAbout)
router.route('/abouts/add').post(validateAddAbout,adminController.addAbout)
router.route('/abouts/update').post(validateUpdateAbout,adminController.updateAbout)
//#endregion

//#region Categories
router.route('/categories/delete/:id').post(adminController.deleteAbout)
router.route('/categories/add').post(validateAddAbout,adminController.addAbout)
router.route('/categories/update').post(validateUpdateAbout,adminController.updateAbout)
//#endregion

module.exports = router