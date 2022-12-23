const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr')

const pageRoute = require("./routes/pageRoute");
const contactRoute = require("./routes/contactRoute");
const adminRoute = require("./routes/adminRoute");

require('dotenv').config()
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  console.log("MongoDB : Connected");
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(toastr());
app.use((req, res, next) => {
  res.locals.toasts = req.toastr.render();
  next();
});

// Global variables

global.userIn = null;

app.use("/", pageRoute);
app.use("/contact", contactRoute);
app.use("/admin", adminRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
