const {validationResult, check} = require("express-validator")
const toastr = require('../../helpers/toastr')

validateContact = [
    check("nameSurname")
    .not().isEmpty().withMessage("Name Surname cannot be empty!")
    .isLength({min:5}).withMessage("Minumum length of name surname must be 5"),
    check("email")
    .not()
    .isEmail().withMessage("Email is invalid!"),
    check("message")
    .not()
    .isEmpty()
    .isLength({min:10}).withMessage("Minumum length of message must be 10"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            for (let i = 0; i < errors.array().length; i++) {
                toastr.sendToastr(req, 'error', errors.array()[i].msg);
            }
            
            return res.status(500).redirect('/')
        }

        global.formErrors = null;
        next();
    },
]

module.exports = validateContact