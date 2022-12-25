const pageController = require("../controllers/pageController")
const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/admin').get(authMiddleware,pageController.getAdminIndexPage)
router.route('/admin/login').get(pageController.getAdminLoginPage)

router.route('/admin/products').get(pageController.getAdminProductsPage)
router.route('/admin/products/add').get(pageController.getAdminAddProductPage)
router.route('/admin/products/update/:id').get(pageController.getAdminUpdateProductPage)

router.route('/admin/abouts').get(pageController.getAdminAboutsPage)
router.route('/admin/abouts/add').get(pageController.getAdminAddAboutPage)
router.route('/admin/abouts/update/:id').get(pageController.getAdminUpdateAboutPage)

router.route('/admin/categories').get(pageController.getAdminCategoriesPage)
router.route('/admin/categories/add').get(pageController.getAdminAddCategoryPage)
router.route('/admin/categories/update/:id').get(pageController.getAdminUpdateCategoryPage)

// router.route('/admin/departments').get(pageController.getAdminDepartmentsPage)
// router.route('/admin/departments/add').get(pageController.getAdminAddDepartmentPage)
// router.route('/admin/departments/update/:id').get(pageController.getAdminUpdateDepartmentPage)

// router.route('/admin/clients').get(pageController.getAdminClientsPage)
// router.route('/admin/clients/add').get(pageController.getAdminAddClientPage)
// router.route('/admin/clients/update/:id').get(pageController.getAdminUpdateClientPage)

// router.route('/admin/employees').get(pageController.getAdminEmployeesPage)
// router.route('/admin/employees/add').get(pageController.getAdminAddEmployeePage)
// router.route('/admin/employees/update/:id').get(pageController.getAdminUpdateEmployeePage)


module.exports = router