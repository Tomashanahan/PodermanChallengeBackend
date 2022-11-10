const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Balanza", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		LimpiarPC: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
		},
		UPS: {
			type: DataTypes.STRING,
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING,
		},
	});
};
