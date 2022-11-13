const { Router } = require("express");
const UserRegister = require("./Register/Register");
const UserLogin = require("./Register/Login");
const Userform = require("./User/Userform");
const Admin = require("./Admin/Admin");
const { checkAuth } = require("../middleware/checkAuth");
const {
	checkRolAdminMiddleware,
} = require("../middleware/checkRolAdminMiddleware");

const { User } = require("../db");
const { Visita } = require("../db");
const { CasaPrincipal } = require("../db");
const { ExAgroinsumos } = require("../db");
const { Taller } = require("../db");
const { Hangar } = require("../db");
const { Oficina } = require("../db");
const { Balanza } = require("../db");
const { Agroinsumos } = require("../db");
const { Camaras } = require("../db");
const router = Router();


router.use("/register", UserRegister);
router.use("/login", UserLogin);
router.use("/userForm", [checkAuth], Userform);
router.use("/admin", [checkAuth, checkRolAdminMiddleware], Admin);

module.exports = router;
