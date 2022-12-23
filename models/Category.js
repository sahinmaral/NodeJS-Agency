const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name : {
        type : Schema.Types.String,
        required:true,
        unique:true
    },
    products : [
        {
            type : Schema.Types.ObjectId,

        }
    ]
})

const Category = mongoose.model("Category",CategorySchema)
module.exports = Category