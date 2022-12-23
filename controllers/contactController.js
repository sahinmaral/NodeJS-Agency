const toastr = require('../helpers/toastr')
const Contact = require('../models/Contact')

exports.sendContact = async(req,res) => {
    try {
        const newContact = req.body
        await Contact.create(newContact)
    } catch (error) {
        toastr.sendToastr(req,'success',"Contact successfully sent")
        return res.status(200).redirect('/')
    }
}