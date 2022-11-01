const jwt = require("jsonwebtoken");

const generarJWT = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			team: user.team,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1d",
		}
	);
};

module.exports = {
	generarJWT,
};
