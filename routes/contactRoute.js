const express = require("express")

const contactController = require('../controllers/contactController')
const validateContact = require('../middlewares/validator/contactValidator')

const router = express.Router()

router.route('/sendContact').post(validateContact,contactController.sendContact)

module.exports = router