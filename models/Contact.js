const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ContactSchema = new Schema({
    nameSurname : {
        type : Schema.Types.String,
        required:true,
    },
    email : {
        type : Schema.Types.String,
        required:true,
    },
    phoneNumber : {
        type : Schema.Types.String,
        required : true
    },
    message : {
        type : Schema.Types.String,
        required:true
    },
})

const Contact = mongoose.model("Contact",ContactSchema)
module.exports = Contact