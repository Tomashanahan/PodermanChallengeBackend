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

// router.get("/hola", async (req, res) => {
// 	const user = await User.findOne({ where: { email: "b@hotmial.com" } });

// 	await Promise.resolve(
// 		CasaPrincipal.create({
// 			RackPrincipalLimpieza: "1",
// 			RackPrincipalOrden: "2",
// 			FuncionamientoAP: "3",
// 			FuncionamientoTelefono: "4",
// 			UPS: "5",
// 		})
// 	).then((res) => user.addCasaPrincipal(res));
// 	await Promise.resolve(
// 		CasaPrincipal.create({
// 			RackPrincipalLimpieza: "tomas",
// 			RackPrincipalOrden: "shanahan",
// 			FuncionamientoAP: "411111",
// 			FuncionamientoTelefono: "santa fe",
// 			UPS: "1234566788",
// 		})
// 	).then((res) => user.addCasaPrincipal(res));

// 	await Promise.resolve(
// 		ExAgroinsumos.create({
// 			RackPrincipalLimpieza: "6",
// 			RackPrincipalOrden: "7",
// 			FuncionamientoAP: "8",
// 		})
// 	).then((res) => user.addExAgroinsumo(res));

// 	// await Promise.resolve(
// 	// 	Taller.create({
// 	// 		RackPrincipalLimpieza: "9",
// 	// 		RackPrincipalOrden: "10",
// 	// 		FuncionamientoTelefono: "11",
// 	// 		FuncionamientoAP: "12",
// 	// 	})
// 	// ).then((res) => user.addTaller(res));

// 	// await Promise.resolve(
// 	// 	Hangar.create({
// 	// 		RackPrincipalLimpieza: "13",
// 	// 		RackPrincipalOrden: "14",
// 	// 		FuncionamientoTelefono: "15",
// 	// 		FuncionamientoAP: "16",
// 	// 	})
// 	// ).then((res) => user.addHangar(res));

// 	// await Promise.resolve(
// 	// 	Oficina.create({
// 	// 		FuncionamientoTelefono: "17",
// 	// 		LimpiarPC: "18",
// 	// 		AcomodarCables: "19",
// 	// 	})
// 	// ).then((res) => user.addOficina(res));

// 	// await Promise.resolve(
// 	// 	Balanza.create({
// 	// 		RackPrincipalLimpieza: "20",
// 	// 		RackPrincipalOrden: "21",
// 	// 		FuncionamientoAP: "22",
// 	// 		LimpiarPC: "23",
// 	// 		UPS: "24",
// 	// 		FuncionamientoTelefono: "25",
// 	// 	})
// 	// ).then((res) => user.addBalanza(res));

// 	// await Promise.resolve(
// 	// 	Agroinsumos.create({
// 	// 		FuncionamientoAP: "26",
// 	// 	})
// 	// ).then((res) => user.addAgroinsumo(res));

// 	await Promise.resolve(
// 		Camaras.create({
// 			ChequearVisualizacion: "27",
// 		})
// 	).then((res) => user.addCamara(res));

// 	const user2 = await CasaPrincipal.findAll(
// 		{ where: { UserId: user.id }, order: [["createdAt", "DESC"]] },
// 		{
// 			include: User,
// 		}
// 	);

// 	res.json(user2);
// });

router.use("/register", UserRegister);
router.use("/login", UserLogin);
router.use("/userForm", [checkAuth], Userform);
router.use("/admin", [checkAuth, checkRolAdminMiddleware], Admin);

module.exports = router;
