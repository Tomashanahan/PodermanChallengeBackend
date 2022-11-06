require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, NODE_ENV } =
	process.env;

const casaPrincipal_model = require("./Models/CasaPrincipal");
const exAgroinsumos_model = require("./Models/ExAgroinsumos");
const agroinsumos_model = require("./Models/Agroinsumos");
const balanza_model = require("./Models/Balanza");
const camaras_model = require("./Models/Camaras");
const hangar_model = require("./Models/Hangar");
const hangaroficina_model = require("./Models/HangarOficina");
const taller_model = require("./Models/Taller");
const user_model = require("./Models/User");

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
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
				{
					logging: false, // set to console.log to see the raw SQL queries
					native: false, // lets Sequelize know we can use pg-native for ~30% more speed
				}
		  );

casaPrincipal_model(sequelize);
exAgroinsumos_model(sequelize);
agroinsumos_model(sequelize);
balanza_model(sequelize);
camaras_model(sequelize);
hangar_model(sequelize);
hangaroficina_model(sequelize);
taller_model(sequelize);
user_model(sequelize);

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

CasaPrincipal.hasMany(User);
User.belongsTo(CasaPrincipal);

Agroinsumos.hasMany(User);
User.belongsTo(Agroinsumos);

Balanza.hasMany(User);
User.belongsTo(Balanza);

Camaras.hasMany(User);
User.belongsTo(Camaras);

ExAgroinsumos.hasMany(User);
User.belongsTo(ExAgroinsumos);

Hangar.hasMany(User);
User.belongsTo(Hangar);

Oficina.hasMany(User);
User.belongsTo(Oficina);

Taller.hasMany(User);
User.belongsTo(Taller);

module.exports = {
	...sequelize.models,
	db: sequelize,
};
