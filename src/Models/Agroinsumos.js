const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Agroinsumos", {
		preference_id: {
			type: DataTypes.STRING,
		},
		Funcionamiento_AP: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
