const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Hangar", {
		preference_id: {
			type: DataTypes.STRING,
		},
		Rack_Principal_Limpieza: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		Rack_Principal_Orden: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
		Funcionamiento_AP: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Funcionamiento_teléfono: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
