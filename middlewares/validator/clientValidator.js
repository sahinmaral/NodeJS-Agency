const {validationResult, check} = require("express-validator")
const toastr = require('../../helpers/toastr')

validateClient = [
    check("name")
    .not().isEmpty().withMessage("Name cannot be empty!")
    .isLength({min:3}).withMessage("Minumum length of name must be 5"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            for (let i = 0; i < errors.array().length; i++) {
                toastr.sendToastr(req, 'error', errors.array()[i].msg);
            }
            
            return res.status(500).redirect('/admin/clients')
        }

        next();
    },
]

module.exports = validateClient