const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("CasaPrincipal", {
		preference_id: {
			type: DataTypes.STRING,
		},
		Funcionamiento_AP: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Funcionamiento_teléfono: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		UPS: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
