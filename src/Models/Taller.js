const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Taller", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING,
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
		},
	});
};
