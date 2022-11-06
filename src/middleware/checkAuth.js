const jwt = require("jsonwebtoken");
const { User } = require("../db");

const checkAuth = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.registro = await User.findOne({
				where: { id: decoded.id, email: decoded.email, team: decoded.team },
				attributes: ["id","fullName", "email", "team"],
			});

			return next();
		} catch (error) {
			const errodr = new Error("Tonken invalido");
			res.status(403).json({ msg: errodr.message });
			next();
		}
	}
	if (!token) {
		const error = new Error("Tonken invalido o inexistente");
		return res.status(403).json({ msg: error.message });
	}
	next();
};

module.exports = {
	checkAuth,
};
