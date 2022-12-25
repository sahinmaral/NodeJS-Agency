const Admin = require("../models/Admin");
const toastr = require('../helpers/toastr')

module.exports = async (req, res, next) => {
    try {
        if(!req.session.adminInfo){
            return res.redirect('/admin/login')
        }
        const admin = await Admin.findById(req.session.adminInfo.id)
        if(!admin){
            return res.redirect('/admin/login')
        }
        global.adminInfo = req.session.adminInfo
        next()
    } catch (error) {
        toastr.sendToastr(req,'error',JSON.stringify(error))
        return res.redirect('/admin/login')
    }
//
};
