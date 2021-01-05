const User = require("../models/User");

const index = async (req, res) => {
    res.render("user/index");
};

const register_get = async (req, res) => {
    res.render("user/register");
};

const register_post = async (req, res) => {
    const { fullname, email, password, password1} = req.body;
    let err;
    if (!fullname || !email || !password || !password1) {
        err = "All Fields are mendatory!";
        res.render("user/register", { err });
    }

    if (password != password1) {
        err = "Passwords Should Match";
        res.render("user/register", { err, fullname, email });
    }

    res.render("user/register");
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