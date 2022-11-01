const checkRolAdminMiddleware = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			if (req.registro.team === "Admin") {
				next();
				return;
			} else {
				const error = new Error("No tienes los permisos suficientes");
				return res.status(409).json({ msg: error.message });
			}
		} catch (error) {
			const errodr = new Error("Tonken invalido");
			res.status(403).json({ msg: errodr.message });
			return next();
		}
	}
	if (!token) {
		const error = new Error("Tonken invalido o inexistente");
		return res.status(403).json({ msg: error.message });
	}
	next();
};

module.exports = {
	checkRolAdminMiddleware,
};
