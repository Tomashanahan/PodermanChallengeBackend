const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Camaras", {
		preference_id: {
			type: DataTypes.STRING,
		},
		ChequearVisualizacion: {
			type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
			allowNull: false,
		},
	});
};
