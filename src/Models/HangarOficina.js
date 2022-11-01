const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Hangar_Oficina", {
		preference_id: {
			type: DataTypes.STRING,
		},
		Funcionamiento_teléfono: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		Limpiar_PC: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		Acomodar_cables: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
	});
};
