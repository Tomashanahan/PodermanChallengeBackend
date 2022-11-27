const {Router} = require("express");

const {checkAuth} = require("../middleware/checkAuth");
const {checkRolAdminMiddleware} = require("../middleware/checkRolAdminMiddleware");

const Admin = require("./Admin/Admin");
const UserRegister = require("./Register/Register");
const UserLogin = require("./Register/Login");
const Userform = require("./User/Userform");

const router = Router();

router.use("/register", UserRegister);
router.use("/login", UserLogin);
router.use("/userForm", [checkAuth], Userform);
router.use("/admin", [checkAuth, checkRolAdminMiddleware], Admin);

module.exports = router;
