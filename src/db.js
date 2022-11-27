require("dotenv").config();
const {Sequelize} = require("sequelize");

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, NODE_ENV} = process.env;

const CasaPrincipalModel = require("./Models/CasaPrincipal");
const AgroinsumosModel = require("./Models/Agroinsumos");
const ExAgroinsumosModel = require("./Models/ExAgroinsumos");
const BalanzaModel = require("./Models/Balanza");
const CamarasModel = require("./Models/Camaras");
const HangarModel = require("./Models/Hangar");
const HangaroficinaModel = require("./Models/HangarOficina");
const TallerModel = require("./Models/Taller");
const UserModel = require("./Models/User");
const VisitaModel = require("./Models/Visita");

const sequelize =
  NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : NODE_ENV === "test"
    ? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/podermanTesting`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      });

CasaPrincipalModel(sequelize);
AgroinsumosModel(sequelize);
ExAgroinsumosModel(sequelize);
BalanzaModel(sequelize);
CamarasModel(sequelize);
HangarModel(sequelize);
HangaroficinaModel(sequelize);
TallerModel(sequelize);
UserModel(sequelize);
VisitaModel(sequelize);

const {
  CasaPrincipal,
  Agroinsumos,
  Balanza,
  Camaras,
  ExAgroinsumos,

  Hangar,
  Oficina,
  Taller,
  User,
} = sequelize.models;

User.hasMany(CasaPrincipal);
CasaPrincipal.belongsTo(User);

User.hasMany(Agroinsumos);
Agroinsumos.belongsTo(User);

User.hasMany(Balanza);
Balanza.belongsTo(User);

User.hasMany(Camaras);
Camaras.belongsTo(User);

User.hasMany(ExAgroinsumos);
ExAgroinsumos.belongsTo(User);

User.hasMany(Hangar);
Hangar.belongsTo(User);

User.hasMany(Oficina);
Oficina.belongsTo(User);

User.hasMany(Taller);
Taller.belongsTo(User);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
