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
	const { typeOfCategory } = req.query;
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

	switch (typeOfCategory) {
		case "casaPrincipal":
			Promise.resolve(loopKey(_casaprincipal, CasaPrincipal)).then((res) =>
				user.addCasaPrincipal(res)
			);
			break;
		case "exAgroinsumos":
			Promise.resolve(loopKey(_exagroinsumos, ExAgroinsumos)).then((res) =>
				user.addExAgroinsumo(res)
			);
			break;
		case "taller":
			Promise.resolve(loopKey(_taller, Taller)).then((res) =>
				user.addTaller(res)
			);
			break;
		case "hangar":
			Promise.resolve(loopKey(_hangar, Hangar)).then((res) =>
				user.addHangar(res)
			);
			break;
		case "oficina":
			Promise.resolve(loopKey(_oficina, Oficina)).then((res) =>
				user.addOficina(res)
			);
			break;
		case "balanza":
			Promise.resolve(loopKey(_balanza, Balanza)).then((res) =>
				user.addBalanza(res)
			);
			break;
		case "agroinsumos":
			Promise.resolve(loopKey(_agroinsumos, Agroinsumos)).then((res) =>
				user.addAgroinsumo(res)
			);
			break;
		case "camaras":
			Promise.resolve(loopKey(_camaras, Camaras)).then((res) =>
				user.addCamara(res)
			);
			break;

	}

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
	const { CasaPrincipal : _CasaPrincipal } = req.body;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoAP,
		FuncionamientoTelefono,
		UPS,
	} = _CasaPrincipal;
	const user = await User.findOne({ where: { email } });

	const casaPrincipal = await CasaPrincipal.findOne(
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
	RackPrincipalLimpieza &&
		(casaPrincipal["RackPrincipalLimpieza"] = RackPrincipalLimpieza);
	RackPrincipalOrden &&
		(casaPrincipal["RackPrincipalOrden"] = RackPrincipalOrden);
	FuncionamientoAP && (casaPrincipal["FuncionamientoAP"] = FuncionamientoAP);
	FuncionamientoTelefono &&
		(casaPrincipal["FuncionamientoTelefono"] = FuncionamientoTelefono);
	UPS && (casaPrincipal["UPS"] = UPS);

	await casaPrincipal.save();

	res.json({
		casaPrincipal: casaPrincipal,
	});
});

// router.put("/ex-agroinsumos", async (req, res) => {
router.put("/exAgroinsumos", async (req, res) => {
	const { email } = req.registro;
	const { ExAgroinsumos : _ExAgroinsumos } = req.body;
	const { RackPrincipalLimpieza, RackPrincipalOrden, FuncionamientoAP } = _ExAgroinsumos;
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
	RackPrincipalLimpieza &&
		(exagroinsumos["RackPrincipalLimpieza"] = RackPrincipalLimpieza);
	RackPrincipalOrden &&
		(exagroinsumos["RackPrincipalOrden"] = RackPrincipalOrden);
	FuncionamientoAP && (exagroinsumos["FuncionamientoAP"] = FuncionamientoAP);

	await exagroinsumos.save();

	res.json({
		exAgroinsumos: exagroinsumos,
	});
});

router.put("/taller", async (req, res) => {
	const { email } = req.registro;
	const { Taller: _Taller } = req.body;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoTelefono,
		FuncionamientoAP,
	} = _Taller;
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

	RackPrincipalLimpieza &&
		(taller["RackPrincipalLimpieza"] = RackPrincipalLimpieza);
	RackPrincipalOrden && (taller["RackPrincipalOrden"] = RackPrincipalOrden);
	FuncionamientoTelefono &&
		(taller["FuncionamientoTelefono"] = FuncionamientoTelefono);
	FuncionamientoAP && (taller["FuncionamientoAP"] = FuncionamientoAP);
	// taller.RackPrincipalLimpieza = RackPrincipalLimpieza;
	// taller.RackPrincipalOrden = RackPrincipalOrden;
	// taller.FuncionamientoTelefono = FuncionamientoTelefono;
	// taller.FuncionamientoAP = FuncionamientoAP;

	await taller.save();

	res.json({
		taller: taller,
	});
});

router.put("/hangar", async (req, res) => {
	const { email } = req.registro;
	const { Hangar : _Hangar } = req.body;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoAP,
		FuncionamientoTelefono,
	} = _Hangar;
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
	RackPrincipalLimpieza &&
		(hangar["RackPrincipalLimpieza"] = RackPrincipalLimpieza);
	RackPrincipalOrden && (hangar["RackPrincipalOrden"] = RackPrincipalOrden);
	FuncionamientoAP && (hangar["FuncionamientoAP"] = FuncionamientoAP);
	FuncionamientoTelefono &&
		(hangar["FuncionamientoTelefono"] = FuncionamientoTelefono);

	await hangar.save();

	res.json({
		hangar: hangar,
	});
});

router.put("/oficina", async (req, res) => {
	const { email } = req.registro;
	const { Oficina : _Oficina } = req.body;
	const { FuncionamientoTelefono, LimpiarPC, AcomodarCables } = _Oficina;
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
	FuncionamientoTelefono &&
		(oficina["FuncionamientoTelefono"] = FuncionamientoTelefono);
	LimpiarPC && (oficina["LimpiarPC"] = LimpiarPC);
	AcomodarCables && (oficina["AcomodarCables"] = AcomodarCables);

	await oficina.save();

	res.json({
		oficina: oficina,
	});
});

router.put("/balanza", async (req, res) => {
	const { email } = req.registro;
	const { Balanza: _Balanza } = req.body;
	const {
		RackPrincipalLimpieza,
		RackPrincipalOrden,
		FuncionamientoAP,
		LimpiarPC,
		UPS,
		FuncionamientoTelefono,
	} = _Balanza;
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
	FuncionamientoTelefono &&
		(balanza["FuncionamientoTelefono"] = FuncionamientoTelefono);
	FuncionamientoAP && (balanza["FuncionamientoAP"] = FuncionamientoAP);
	RackPrincipalLimpieza && (balanza["RackPrincipalLimpieza"] = RackPrincipalLimpieza);
	UPS && (balanza["UPS"] = UPS);
	LimpiarPC && (balanza["LimpiarPC"] = LimpiarPC);
	RackPrincipalOrden && (balanza["RackPrincipalOrden"] = RackPrincipalOrden);

	await balanza.save();

	res.json({
		balanza: balanza,
	});
});

router.put("/agroinsumos", async (req, res) => {
	const { email } = req.registro;
	const { Agroinsumos: _Agroinsumos } = req.body;
	const { FuncionamientoAP } = _Agroinsumos;
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
	FuncionamientoAP && (agroinsumos["FuncionamientoAP"] = FuncionamientoAP);

	await agroinsumos.save();

	res.json({
		agroinsumos: agroinsumos,
	});
});

router.put("/camaras", async (req, res) => {
	const { email } = req.registro;
	const { Camaras: _Camaras } = req.body;

	const { ChequearVisualizacion } = _Camaras;
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
	ChequearVisualizacion &&
		(camaras["ChequearVisualizacion"] = ChequearVisualizacion);

	await camaras.save();

	res.json({
		camaras: camaras,
	});
});

module.exports = router;
