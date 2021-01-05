const express = require("express");
const router = express.Router();

const HomeController = require("../controller/homeController");

router.get("/", HomeController.index);

module.exports = router;