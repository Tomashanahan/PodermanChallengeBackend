const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Agroinsumos", {
		preference_id: {
			type: DataTypes.STRING,
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
		},
	});
};
