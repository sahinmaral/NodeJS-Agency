const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const AdminSchema = new Schema({
    username : {
        type: Schema.Types.String,
        required:true,
        unique : true
    },
    password : {
        type: Schema.Types.String,
        required:true,
    }
})

const Admin = mongoose.model("Admin",AdminSchema)
module.exports = Admin