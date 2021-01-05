const express = require("express");
const router = express.Router();

const passport = require("passport");
router.use(passport.initialize());
router.use(passport.session());

const userController = require("../controller/userController")

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0");
        return next();
    } else {
        res.redirect("/user/login")
    }
}

router.get("/", userController.index);

router.get("/register", userController.register_get);

router.post("/register", userController.register_post);


router.get("/login", userController.login_get);

router.post("/login", checkAuthenticated, userController.login_post);

router.get("/logout", userController.logout);

module.exports = router;