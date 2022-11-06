const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("CasaPrincipal", {
		preference_id: {
			type: DataTypes.STRING,
		},
		RackPrincipalLimpieza: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		RackPrincipalOrden: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		FuncionamientoAP: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		UPS: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
