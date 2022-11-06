const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("ExAgroinsumos", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
