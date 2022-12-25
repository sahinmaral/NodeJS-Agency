const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");
const fileUpload = require("express-fileupload");

const pageRoute = require("./routes/pageRoute");
const contactRoute = require("./routes/contactRoute");
const adminRoute = require("./routes/adminRoute");
const MongoStore = require("connect-mongo");

require("dotenv").config();
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  console.log("MongoDB : Connected");
});
//
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var sessionConfigs = {
  secret: process.env.SECRET_SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  store : MongoStore.create({
    mongoUrl : process.env.MONGODB_CONNECTION_STRING,
    autoRemove : "native"
  })
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfigs.cookie.secure = true;
}

app.use(session(sessionConfigs));

app.use(flash());
app.use(toastr());
app.use((req, res, next) => {
  res.locals.toasts = req.toastr.render();
  next();
});
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);


// Global variables

global.adminInfo = {
  username : "sahinmaral"
}

app.use("/", pageRoute);
app.use("/contact", contactRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
