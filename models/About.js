const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AboutSchema = new Schema({
    startDate : {
        type : Schema.Types.Date,
        required:true
    },
    endDate : {
        type:Schema.Types.Date,
        required:false
    },
    header : {
        type : Schema.Types.String,
        required:true
    },
    description : {
        type : Schema.Types.String,
        required:true
    },
    imageUrl :  {
        type : Schema.Types.String,
        required:true
    },
})

const About = mongoose.model("About",AboutSchema)
module.exports = About

