const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ClientSchema = new Schema({
    name : {
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
})

const Client = mongoose.model("Client",ClientSchema)
module.exports = Client