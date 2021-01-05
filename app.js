const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

require('dotenv').config();
// Connecting to database
const DBURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.cpwfq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`)))
    .catch(err => console.log(err))

// Setting EJS View Engine
app.set("view engine", "ejs") // By default it will look files in "views" directory

// setting static files
app.use(express.static("public"));

// Middlewares
app.use(morgan("dev"));

app.use(express.urlencoded({extended: true}))
app.use(cookieParser("secret"));
app.use(session({
    secret: "thisisasecret",
    maxAge: 36000000,
    resave: true,
    saveUninitialized: true
}))

//custom Middlewares
// app.use( async (req, res, next) => {
//     console.log("New Request Made");
//     console.log(`host: ${req.hostname}`);
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);

//     // Going to next middleware
//     next();
// });

// app.use( async (req, res, next) => {
//     console.log(`Now in a different middleware!`);

//     // Going to next middleware
//     next();
// });




// Importing routes
const homeRouter = require("./routes/homeRouter");
const UserRouter = require("./routes/userRouter");

app.use("/", homeRouter);
app.use("/user", UserRouter);



// 404 Page is set as middle ware but also at the bottom so that
// it will get fired up if there's no "URL" in the above functions
app.use((req, res) => {
    res.send("404 Not Found!")
});