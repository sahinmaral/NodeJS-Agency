const {validationResult, check} = require("express-validator")
const toastr = require('../../helpers/toastr')

validateAdmin = [
    check("username")
    .not().isEmpty().withMessage("Username cannot be empty!"),
    check("password")
    .not()
    .isEmpty().withMessage("Password cannot be empty!"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            for (let i = 0; i < errors.array().length; i++) {
                toastr.sendToastr(req, 'error', errors.array()[i].msg);
            }
            
            return res.status(500).redirect('/admin/login')
        }

        next();
    },
]

module.exports = validateAdmin