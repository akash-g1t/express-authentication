const User = require("../models/User");
const bcrypt = require("bcrypt");

const index = async (req, res) => {
    res.render("user/index");
};

const register_get = async (req, res) => {
    res.render("user/register");
};

const register_post = async (req, res) => {
    let { fullname, email, password, password1} = req.body;
    let err;
    if (!fullname || !email || !password || !password1) {
        err = "All Fields are mendatory!";
        res.render("user/register", { err });
    }

    if (password != password1) {
        err = "Passwords Should Match";
        res.render("user/register", { err, fullname, email });
    }

    if (typeof err == "undefined") {
        User.findOne({email: email}, async (err, data)=> {
            if(err) throw err;
            if (data) {
                console.log("user Already Exist!");
                err = "User Already Exists";
                res.render("user/register", { err, fullname, email });
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
                            res.redirect("/user/login");
                            
                        } catch (error) {
                            err = "SOmething went wrong, Please try again!";
                            res.render("user/register", { err, fullname, email });
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


const login_post = async (req, res) => {
    res.render("user/login");
};

module.exports = {
    index,
    register_get,
    register_post,
    login_get,
    login_post
}