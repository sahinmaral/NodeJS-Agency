const { validationResult, check } = require("express-validator");
const toastr = require("../../helpers/toastr");

validateAddAbout = [
  check("header")
    .not()
    .isEmpty()
    .withMessage("Header cannot be empty!")
    .isLength({ min: 5 })
    .withMessage("Minumum length of header must be 5"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("Description cannot be empty!")
    .isLength({ min: 5 })
    .withMessage("Minumum length of description must be 5"),
  check("startDate")
    .not()
    .isEmpty()
    .withMessage("Start date cannot be empty!")
    .custom((startDate, { req }) => {
      if (!req.body.isEndDate) {
        if (req.body.endDate.getTime() <= startDate.getTime()) {
          throw new Error("Start date must be before end date");
        }
      }
      return true;
    }),
  check("endDate").custom((endDate, { req }) => {
    if (!req.body.isEndDate) {
      if (endDate === '') {
        throw new Error("End date cannot be empty if about is not going");
      }
    }
    return true;
  }),
  check("imageUrl").custom((_, { req }) => {
    if (!req.files) throw new Error("Image must be uploaded!");
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        toastr.sendToastr(req, "error", errors.array()[i].msg);
      }

      return res.status(500).redirect("/admin/abouts");
    }

    global.formErrors = null;
    next();
  },
];

validateUpdateAbout = [
  check("header")
    .not()
    .isEmpty()
    .withMessage("Header cannot be empty!")
    .isLength({ min: 5 })
    .withMessage("Minumum length of header must be 5"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("Description cannot be empty!")
    .isLength({ min: 5 })
    .withMessage("Minumum length of description must be 5"),
  check("startDate")
    .not()
    .isEmpty()
    .withMessage("Start date cannot be empty!")
    .custom((startDate, { req }) => {

      if (req.body.isEndDate === "0") {
        if (req.body.endDate <= startDate) {
          throw new Error("Start date must be before end date");
        }
      }
      return true;
    }),
  check("endDate").custom((endDate, { req }) => {
    if (!req.body.isEndDate) {
      if (endDate === '') {
        throw new Error("End date cannot be empty if about is not going");
      }
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        toastr.sendToastr(req, "error", errors.array()[i].msg);
      }

      return res.status(500).redirect("/admin/abouts");
    }

    global.formErrors = null;
    next();
  },
];

module.exports = {validateAddAbout,validateUpdateAbout};
