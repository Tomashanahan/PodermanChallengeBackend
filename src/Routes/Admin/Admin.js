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
	const user = req.registro;
	let totalInfo = await User.findAll({
		attributes: ["id", "fullName", "email", "team"],
		include: [
			CasaPrincipal,
			ExAgroinsumos,
			Taller,
			Hangar,
			Oficina,
			Balanza,
			Agroinsumos,
			Camaras,
		],
	});

	res.json(totalInfo);
});

module.exports = router;
