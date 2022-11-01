const { Router } = require("express");
const UserRegister = require("./Register/Register");
const UserLogin = require("./Register/Login");
const UserInfo = require("./Users/UserInfo");
const { checkAuth } = require("../middleware/checkAuth");
const {
	checkRolAdminMiddleware,
} = require("../middleware/checkRolAdminMiddleware");

const router = Router();

router.use("/register", UserRegister);
router.use("/login", UserLogin);
router.use("/infoUser", [checkAuth, checkRolAdminMiddleware], UserInfo);

module.exports = router;
