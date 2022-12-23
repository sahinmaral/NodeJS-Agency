const Product = require('../models/Product')
const Category = require('../models/Category')
const Client = require('../models/Client')
const Department = require('../models/Department')
const Employee = require('../models/Employee')
const About = require('../models/About')
const toastr = require('../helpers/toastr')

exports.getIndexPage = async (req,res) => {    


    try {
        const products = await Product.find()
        const employees = await Employee.find()
        const abouts = await About.find()

        const productsDetail = await Promise.all(products.map(async(product) => {
            
            return {
                _id : product._id,
                name : product.name,
                slogan : product.slogan,
                description : product.description,
                imageUrl : product.imageUrl,
                client : await Client.findById(product.client),
                category : await Category.findById(product.category)
            }
        }))

        const employeeDetail = await Promise.all(employees.map(async(employee) => {
            return {
                fullName : employee.name.concat(employee.surname),
                imageUrl : employee.imageUrl,
                githubUrl : employee.githubUrl,
                linkedinUrl : employee.linkedinUrl,
                department : await Department.findById(employee.department)
            }
        }))

        return res.status(200).render('index',{
            products : productsDetail,
            employees : employeeDetail,
            abouts : abouts
        })
    } catch (error) {
        toastr.sendToastr(req,"error","Database error")
        return res.status(500).render('index',{
            products : [],
            employees : [],
            abouts : [],
            req : req
        })
    }

    
}