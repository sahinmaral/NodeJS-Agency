const express = require('express')

const adminController = require('../controllers/adminController')
const validateCategory = require('../middlewares/validator/categoryValidator')
const validateClient = require('../middlewares/validator/clientValidator')
const validateDepartment = require('../middlewares/validator/departmentValidator')
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
router.route('/categories/delete/:id').post(adminController.deleteCategory)
router.route('/categories/add').post(validateCategory,adminController.addCategory)
router.route('/categories/update').post(validateCategory,adminController.updateCategory)
//#endregion

//#region Clients
router.route('/clients/delete/:id').post(adminController.deleteClient)
router.route('/clients/add').post(validateClient,adminController.addClient)
router.route('/clients/update').post(validateClient,adminController.updateClient)
//#endregion

//#region Clients
router.route('/departments/delete/:id').post(adminController.deleteDepartment)
router.route('/departments/add').post(validateDepartment,adminController.addDepartment)
router.route('/departments/update').post(validateDepartment,adminController.updateDepartment)
//#endregion

module.exports = router