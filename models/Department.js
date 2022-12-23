const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
    name : {
        type : Schema.Types.String,
        required : true
    },
    teams : [
        {
            type : Schema.Types.ObjectId,
            required: true
        }
    ]

})

const Department = mongoose.model('Department',DepartmentSchema)
module.exports = Department