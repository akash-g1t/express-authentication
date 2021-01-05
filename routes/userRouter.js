const express = require("express");
const router = express.Router();

const userController = require("../controller/userController")

const checkAuthenticated = require("../middleware/checkAuthenticated");

router.get("/", checkAuthenticated, userController.index);

router.get("/register", userController.register_get);

router.post("/register", userController.register_post);


router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

router.get("/logout", userController.logout);

module.exports = router;