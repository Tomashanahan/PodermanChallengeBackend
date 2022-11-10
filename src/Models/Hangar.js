const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Hangar", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING,
		},
	});
};
