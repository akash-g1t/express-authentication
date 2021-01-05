const User = require("../models/User");
const bcrypt = require("bcrypt");

const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy({ usernameField: "email" }, async (email, password, done) => {
    await User.findOne({email: email}, async (err, data) => {
        if (err) throw err;
        if (!data) {
            console.log("no user found")
            return done(null, false);
        }
        const match = await bcrypt.compare(password, data.password)
        console.log(match);
        if (!match) {
            return done(null, false);
        }
        if (match) {
            return done(null, data)
        }
    })
}));

passport.serializeUser(async (user, cb)=> {
    cb(null, user.id);
})

passport.deserializeUser(async (id, cb) => {
    await User.findById(id, async (err, user) => {
        cb(err, user);
    })
})

module.exports = passport;