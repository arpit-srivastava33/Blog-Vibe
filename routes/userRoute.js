const express = require("express");
const { getAllUser, registerController, loginController } = require("../controllers/userController");
//Route Object
const router = express.Router();

//get user || GET
router.get("/allUser", getAllUser);

// creater user || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

module.exports = router;