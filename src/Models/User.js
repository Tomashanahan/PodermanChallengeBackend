const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("User", {
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		team: {
			type: DataTypes.ENUM("Microinformatica", "Telecomunicaciones", "Admin"),
			allowNull: false,
		},
	});
};
