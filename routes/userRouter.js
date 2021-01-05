const express = require("express");
const router = express.Router();

const userController = require("../controller/userController")

router.get("/", userController.index);

router.get("/register", userController.register_get);

router.post("/register", userController.register_post);


router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

module.exports = router;