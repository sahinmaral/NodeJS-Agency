const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name : {
        type : Schema.Types.String,
        required:true,
        unique : true
    },
    slogan : {
        type : Schema.Types.String,
        required:true,
        unique:true
    },
    imageUrl : {
        type : Schema.Types.String,
        required : true
    },
    description : {
        type : Schema.Types.String,
        required:true
    },
    client : {
        type: Schema.Types.ObjectId,
        ref : "Client",
        required:true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
})

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product