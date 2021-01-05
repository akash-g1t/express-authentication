const User = require("../models/User");
const bcrypt = require("bcrypt");

const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {

    passport.use(new localStrategy({ usernameField: "email" }, async (email, password, done) => {
        await User.findOne({email: email}, async (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User doesn't exist!"});
            }
            const match = await bcrypt.compare(password, data.password)
            console.log(match);
            if (!match) {
                return done(null, false, { message: "Check Your Creadentials and try again!"});
            }
            if (match) {
                return done(null, data)
            }
        })
    }));

    passport.serializeUser(async (user, cb)=> {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        await User.findById(id, async (err, user) => {
            cb(err, user);
        });
    });
}