require("dotenv").config();
const { Router } = require("express");
const { Op } = require("sequelize");
const { User } = require("../../db");
const { CasaPrincipal } = require("../../db");
const { ExAgroinsumos } = require("../../db");
const { Taller } = require("../../db");
const { Hangar } = require("../../db");
const { Oficina } = require("../../db");
const { Balanza } = require("../../db");
const { Agroinsumos } = require("../../db");
const { Camaras } = require("../../db");

const router = Router();
router.post("/form", async (req, res) => {
	const user = req.registro;
	const {
		CasaPrincipal: _casaprincipal,
		ExAgroinsumos: _exagroinsumos,
		Taller: _taller,
		Hangar: _hangar,
		Oficina: _oficina,
		Balanza: _balanza,
		Agroinsumos: _agroinsumos,
		Camaras: _camaras,
	} = req.body;

	const loopKey = async (obj, Table) => {
		let newElements = await Table.create(obj);
		return newElements;
	};

	Promise.resolve(loopKey(_casaprincipal, CasaPrincipal)).then((res) =>
		user.addCasaPrincipal(res)
	);
	Promise.resolve(loopKey(_exagroinsumos, ExAgroinsumos)).then((res) =>
		user.addExAgroinsumo(res)
	);
	Promise.resolve(loopKey(_taller, Taller)).then((res) => user.addTaller(res));
	Promise.resolve(loopKey(_hangar, Hangar)).then((res) => user.addHangar(res));
	Promise.resolve(loopKey(_oficina, Oficina)).then((res) =>
		user.addOficina(res)
	);
	Promise.resolve(loopKey(_balanza, Balanza)).then((res) =>
		user.addBalanza(res)
	);
	Promise.resolve(loopKey(_agroinsumos, Agroinsumos)).then((res) =>
		user.addAgroinsumo(res)
	);
	Promise.resolve(loopKey(_camaras, Camaras)).then((res) =>
		user.addCamara(res)
	);

	// res.json(user);
	res.json({
		CasaPrincipal: _casaprincipal,
		ExAgroinsumos: _exagroinsumos,
		Taller: _taller,
		Hangar: _hangar,
		Oficina: _oficina,
		Balanza: _balanza,
		Agroinsumos: _agroinsumos,
		Camaras: _camaras,
	});
});

router.get("/", async (req, res) => {
	// GET ALL THE EXISTING INFORMATION THE USER COMPLETE
	const { email } = req.registro;
	const user = await User.findOne({ where: { email } });

	const casaprincipal = await CasaPrincipal.findAll(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				UPS: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const exagroinsumos = await ExAgroinsumos.findAll(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const taller = await Taller.findAll(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const hangar = await Hangar.findAll(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const oficina = await Oficina.findAll(
		{
			where: {
				UserId: user.id,
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				LimpiarPC: {
					[Op.ne]: null,
				},
				AcomodarCables: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const balanza = await Balanza.findAll(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				LimpiarPC: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				UPS: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const agroinsumos = await Agroinsumos.findAll(
		{
			where: {
				UserId: user.id,
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	const camaras = await Camaras.findAll(
		{
			where: {
				UserId: user.id,
				ChequearVisualizacion: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);

	res.json({
		casaPrincipal: casaprincipal[0],
		exAgroinsumos: exagroinsumos[0],
		taller: taller[0],
		hangar: hangar[0],
		oficina: oficina[0],
		balanza: balanza[0],
		agroinsumos: agroinsumos[0],
		camaras: camaras[0],
	});
});

router.put("/casaprincipal", async (req, res) => {
	const { email } = req.registro;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoAP,
		FuncionamientoTelefono,
		UPS,
	} = req.body;
	const user = await User.findOne({ where: { email } });

	const casaprincipal = await CasaPrincipal.findOne(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				UPS: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	casaprincipal["RackPrincipalLimpieza"] = RackPrincipalLimpieza;
	casaprincipal["RackPrincipalOrden"] = RackPrincipalOrden;
	casaprincipal["FuncionamientoAP"] = FuncionamientoAP;
	casaprincipal["FuncionamientoTelefono"] = FuncionamientoTelefono;
	casaprincipal["UPS"] = UPS;

	await casaprincipal.save();

	res.json({
		casaPrincipal: casaprincipal,
	});
});

router.put("/exAgroinsumos", async (req, res) => {t
	const { email } = req.registro;
	const { RackPrincipalLimpieza, RackPrincipalOrden, FuncionamientoAP } =
		req.body;
	const user = await User.findOne({ where: { email } });

	const exagroinsumos = await ExAgroinsumos.findOne(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	exagroinsumos["RackPrincipalLimpieza"] = RackPrincipalLimpieza;
	exagroinsumos["RackPrincipalOrden"] = RackPrincipalOrden;
	exagroinsumos["FuncionamientoAP"] = FuncionamientoAP;

	await exagroinsumos.save();

	res.json({
		exAgroinsumos: exagroinsumos,
	});
});

router.put("/taller", async (req, res) => {
	const { email } = req.registro;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoTelefono,
		FuncionamientoAP,
	} = req.body;
	const user = await User.findOne({ where: { email } });

	const taller = await Taller.findOne(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	taller["RackPrincipalLimpieza"] = RackPrincipalLimpieza;
	taller["RackPrincipalOrden"] = RackPrincipalOrden;
	taller["FuncionamientoTelefono"] = FuncionamientoTelefono;
	taller["FuncionamientoAP"] = FuncionamientoAP;

	await taller.save();

	res.json({
		taller: taller,
	});
});

router.put("/hangar", async (req, res) => {
	const { email } = req.registro;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoAP,
		FuncionamientoTelefono,
	} = req.body;
	const user = await User.findOne({ where: { email } });

	const hangar = await Hangar.findOne(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	hangar["RackPrincipalLimpieza"] = RackPrincipalLimpieza;
	hangar["RackPrincipalOrden"] = RackPrincipalOrden;
	hangar["FuncionamientoAP"] = FuncionamientoAP;
	hangar["FuncionamientoTelefono"] = FuncionamientoTelefono;

	await hangar.save();

	res.json({
		hangar: hangar,
	});
});

router.put("/oficina", async (req, res) => {
	const { email } = req.registro;
	const { FuncionamientoTelefono, LimpiarPC, AcomodarCables } = req.body;
	const user = await User.findOne({ where: { email } });

	const oficina = await Oficina.findOne(
		{
			where: {
				UserId: user.id,
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
				LimpiarPC: {
					[Op.ne]: null,
				},
				AcomodarCables: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	oficina["FuncionamientoTelefono"] = FuncionamientoTelefono;
	oficina["LimpiarPC"] = LimpiarPC;
	oficina["AcomodarCables"] = AcomodarCables;

	await oficina.save();

	res.json({
		oficina: oficina,
	});
});

router.put("/balanza", async (req, res) => {
	const { email } = req.registro;
	const {
		RackPrincipalOrden,
		LimpiarPC,
		FuncionamientoAP,
		UPS,
		FuncionamientoTelefono,
	} = req.body;
	const user = await User.findOne({ where: { email } });

	const balanza = await Balanza.findOne(
		{
			where: {
				UserId: user.id,
				RackPrincipalLimpieza: {
					[Op.ne]: null,
				},
				RackPrincipalOrden: {
					[Op.ne]: null,
				},
				LimpiarPC: {
					[Op.ne]: null,
				},
				FuncionamientoAP: {
					[Op.ne]: null,
				},
				UPS: {
					[Op.ne]: null,
				},
				FuncionamientoTelefono: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	balanza["FuncionamientoTelefono"] = FuncionamientoTelefono;
	balanza["FuncionamientoAP"] = FuncionamientoAP;
	balanza["UPS"] = UPS;
	balanza["LimpiarPC"] = LimpiarPC;
	balanza["RackPrincipalOrden"] = RackPrincipalOrden;

	await balanza.save();

	res.json({
		balanza: balanza,
	});
});

router.put("/agroinsumos", async (req, res) => {
	const { email } = req.registro;
	const { FuncionamientoAP } = req.body;
	const user = await User.findOne({ where: { email } });

	const agroinsumos = await Agroinsumos.findOne(
		{
			where: {
				UserId: user.id,
				FuncionamientoAP: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	agroinsumos["FuncionamientoAP"] = FuncionamientoAP;

	await agroinsumos.save();

	res.json({
		agroinsumos: agroinsumos,
	});
});

router.put("/camaras", async (req, res) => {
	const { email } = req.registro;
	const { ChequearVisualizacion } = req.body;
	const user = await User.findOne({ where: { email } });

	const camaras = await Camaras.findOne(
		{
			where: {
				UserId: user.id,
				ChequearVisualizacion: {
					[Op.ne]: null,
				},
			},
			order: [["createdAt", "DESC"]],
		},
		{
			include: User,
		}
	);
	camaras["ChequearVisualizacion"] = ChequearVisualizacion;

	await camaras.save();

	res.json({
		camaras: camaras,
	});
});

module.exports = router;
