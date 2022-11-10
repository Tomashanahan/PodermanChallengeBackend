const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("CasaPrincipal", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING,
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING,
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING,
		},
		UPS: {
			type: DataTypes.STRING,
		},
	});
};
