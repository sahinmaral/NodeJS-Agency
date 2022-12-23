const pageController = require("../controllers/pageController")
const express = require("express")

const router = express.Router()

router.route('/').get(pageController.getIndexPage)

module.exports = router