const { Router } = require("express");
const { User } = require("../../db");
const { generarJWT } = require("../../herpers/generarJWT");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;

		//Busca el user
		const checkIfUserExists = await User.findOne({
			where: { email },
		});

		if (!checkIfUserExists) {
			const error = new Error("El usuario no existe");
			return res.status(404).json({ msg: error.message });
		}

		// Comprobar passfrom con pass hash
		comprobarPassword = async function (_password, hash) {
			return bcrypt.compareSync(_password, hash);
		};

		if (await comprobarPassword(password, checkIfUserExists.password)) {
			//autenticar -JWT
			res.json({
				id: checkIfUserExists.id,
				fullName: checkIfUserExists.fullName,
				email: checkIfUserExists.email,
				team: checkIfUserExists.team,
				token: generarJWT(checkIfUserExists),
			});
		} else {
			return res.status(403).json({ msg: "Password incorrecto" });
		}
	} catch (error) {
		res.status(404).json({ msg: `Error el usuario no existe ${error}` });
	}
});

module.exports = router;
