require("dotenv").config();
const { Router } = require("express");
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
		user.setCasaPrincipal(res)
	);
	Promise.resolve(loopKey(_exagroinsumos, ExAgroinsumos)).then((res) =>
		user.setExAgroinsumo(res)
	);
	Promise.resolve(loopKey(_taller, Taller)).then((res) => user.setTaller(res));
	Promise.resolve(loopKey(_hangar, Hangar)).then((res) => user.setHangar(res));
	Promise.resolve(loopKey(_oficina, Oficina)).then((res) =>
		user.setOficina(res)
	);
	Promise.resolve(loopKey(_balanza, Balanza)).then((res) =>
		user.setBalanza(res)
	);
	Promise.resolve(loopKey(_agroinsumos, Agroinsumos)).then((res) =>
		user.setAgroinsumo(res)
	);
	Promise.resolve(loopKey(_camaras, Camaras)).then((res) =>
		user.setCamara(res)
	);

	res.json(user);
});

module.exports = router;
