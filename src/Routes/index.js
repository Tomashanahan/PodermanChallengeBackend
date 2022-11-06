const { Router } = require("express");
const UserRegister = require("./Register/Register");
const UserLogin = require("./Register/Login");
const Userform = require("./User/Userform");
const Admin = require("./Admin/Admin");
const { checkAuth } = require("../middleware/checkAuth");
const {
	checkRolAdminMiddleware,
} = require("../middleware/checkRolAdminMiddleware");

const router = Router();

router.use("/register", UserRegister);
router.use("/login", UserLogin);
router.use("/userForm", [checkAuth], Userform);
router.use("/admin", [checkAuth, checkRolAdminMiddleware], Admin);

module.exports = router;
