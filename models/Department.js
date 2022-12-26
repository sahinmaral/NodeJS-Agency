const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
    name : {
        type : Schema.Types.String,
        required : true
    },
    employees : [
        {
            type : Schema.Types.ObjectId,
        }
    ]

})

const Department = mongoose.model('Department',DepartmentSchema)
module.exports = Department