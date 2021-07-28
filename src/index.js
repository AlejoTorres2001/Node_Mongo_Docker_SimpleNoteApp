const express = require("express");
_handlebars = require('handlebars'),
{allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport= require('passport');

//init
const app = express();
require("./database");
require("./config/passport")
//settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    
  })
);
app.set("view engine", ".hbs");

//Middleware

app.set(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

//Global varaibles
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next();
})
//routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));
//Static files

app.use(express.static(path.join(__dirname, "public")));

//Server listening

app.listen(app.get("port"), () => console.log("App listening on port 3000!"));
