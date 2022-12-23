const Product = require('../models/Product')
const Category = require('../models/Category')
const Client = require('../models/Client')

const toastr = require('../helpers/toastr')
const mongoose = require("mongoose")

exports.getIndexPage = (req,res) => {
    return res.status(200).render('./admin/index')
}

exports.getProductsPage = async(req,res) => {
    try {
        const products = await Product.find()

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

        return res.status(200).render('./admin/products',{
            products : productsDetail
        })
    } catch (error) {
        return res.status(501).json({
            status : "database error",
            error
        })
    }

    
}

exports.getUpdateProductPage = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(501).json({
            status : "database error",
            error
        })
    }
}

exports.deleteProduct = async (req,res) => {
    try {
        await Product.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
        
        toastr.sendToastr(req,"success","Product successfully deleted")
        return res.status(200).redirect('/admin/products')
    } catch (error) {
        return res.status(501).json({
            status : "database error",
            error : JSON.stringify(error)
        })
    }
}