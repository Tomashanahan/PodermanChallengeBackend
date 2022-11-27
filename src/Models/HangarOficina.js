const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Oficina", {
    preference_id: {
      type: DataTypes.STRING,
    },
    FuncionamientoTelefono: {
      type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
    },
    LimpiarPC: {
      type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
    },
    AcomodarCables: {
      type: DataTypes.STRING, // ESTO TIENE QUE SER FOTO
    },
  });
};
