const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Oficina", {
		preference_id: {
			type: DataTypes.STRING,
		},
		FuncionamientoTelefono: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		LimpiarPC: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		AcomodarCables: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
	});
};
