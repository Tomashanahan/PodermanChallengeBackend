const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("User", {
		fullName: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		hashedPassword: {
			type: DataTypes.STRING,
		},
		team: {
			type: DataTypes.ENUM("Microinformatica", "Telecomunicaciones"),
		},
		rol: {
			type: DataTypes.ENUM("Admin", "User"),
		},
	});
};
