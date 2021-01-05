const User = require("../models/User");
const bcrypt = require("bcrypt");

const passport = require("./passportStrategy");

const index = async (req, res) => {
    res.render("user/index", { user: req.user });
};

const register_get = async (req, res) => {
    res.render("user/register");
};

const register_post = async (req, res) => {
    let { fullname, email, password, password1} = req.body;
    let error;
    if (!fullname || !email || !password || !password1) {
        error = "All Fields are mendatory!";
        res.render("user/register", { error });
    }

    if (password != password1) {
        error = "Passwords Should Match";
        res.render("user/register", { error, fullname, email });
    }

    if (typeof error == "undefined") {
        User.findOne({email: email}, async (err, data)=> {
            if(err) throw err;
            if (data) {
                console.log("user Already Exist!");
                error = "User Already Exists";
                res.render("user/register", { error, fullname, email });
            } else {
                await bcrypt.genSalt(10, async (err, salt) => {
                    if (err) throw err;
                    await bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        try {
                            await User({
                                fullname,
                                email,
                                password
                            }).save();
                            req.flash("success_message", "You can Login Now!");
                            res.redirect("/user/login");
                            
                        } catch (error) {
                            error = "SOmething went wrong, Please try again!";
                            res.render("user/register", { error, fullname, email });
                        }
                    })
                });
            }
        })
    }
};


const login_get = async (req, res) => {
    res.render("user/login");
};


const login_post = async (req, res, next) => {
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        successRedirect: "/user",
        failureFlash: true
    })(req, res, next);
};


const logout = async (req, res) => {
    req.logout();
    res.redirect("/user/login")
}

module.exports = {
    index,
    register_get,
    register_post,
    login_get,
    login_post,
    logout
}