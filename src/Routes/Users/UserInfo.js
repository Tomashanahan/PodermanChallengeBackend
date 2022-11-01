const { Router } = require("express");
const { User } = require("../../db");

const router = Router();

/* TESTING USER PRIVATE INFO */

router.get("/", async (req, res) => {
	// ACA VIENE INFO DEL MIDDLEWARE --> req.registro
	res.json(req.registro);
});

module.exports = router;
