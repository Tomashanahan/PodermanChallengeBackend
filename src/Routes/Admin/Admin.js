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

router.get("/getAllInformation", async (req, res) => {
	const casaprincipal = await CasaPrincipal.findAll({
		order: [["createdAt", "DESC"]],
	});
	const exagroinsumos = await ExAgroinsumos.findAll({
		order: [["createdAt", "DESC"]],
	});
	const taller = await Taller.findAll({
		order: [["createdAt", "DESC"]],
	});
	const hangar = await Hangar.findAll({
		order: [["createdAt", "DESC"]],
	});
	const oficina = await Oficina.findAll({
		order: [["createdAt", "DESC"]],
	});
	const balanza = await Balanza.findAll({
		order: [["createdAt", "DESC"]],
	});
	const agroinsumos = await Agroinsumos.findAll({
		order: [["createdAt", "DESC"]],
	});
	const camaras = await Camaras.findAll({
		order: [["createdAt", "DESC"]],
	});

	res.json({
		casaprincipal,
		exagroinsumos,
		taller,
		hangar,
		oficina,
		balanza,
		agroinsumos,
		camaras,
	});
});

module.exports = router;
