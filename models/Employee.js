const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    name : {
        type : Schema.Types.String,
        required:true
    },
    surname : {
        type : Schema.Types.String,
        required:true
    },
    imageUrl : {
        type : Schema.Types.String,
        required:true
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : "Department"
    },
    linkedinUrl : {
        type : Schema.Types.String,
        required:true
    },
    githubUrl : {
        type : Schema.Types.String,
        required:true
    },
})

const Employee = mongoose.model("Employee",EmployeeSchema)
module.exports = Employee

