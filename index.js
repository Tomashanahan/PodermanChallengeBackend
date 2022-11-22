const express = require("express");

const server = express();
const cors = require("cors");
const { db } = require("./src/db");
const routes = require("./src/Routes/index");

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use(cors());

server.use(express.json());
server.use("/", routes);

// db.sync({ force: true }).then(() => {
db.sync({ force: false }).then(() => {
	server.listen(process.env.PORT, () => {
		// console.log("Server rinning in Port:", process.env.PORT);
	});
});

// if (process.env.PORT_TESTIN === "null") {
// 	console.log("first");
// 	db.sync({ force: false }).then(() => {
// 		server.listen(process.env.PORT, () => {
// 			console.log("Server rinning in Port:", process.env.PORT);
// 		});
// 	});
// } else {
// 	console.log('process.env.PORT_TESTIN:', process.env.PORT_TESTIN)
// 	db.sync({ force: true }).then(() => {
// 		server.listen(process.env.PORT_TESTIN, () => {
// 			console.log("Server rinning in Port:", process.env.PORT_TESTIN);
// 		});
// 	});
// }

module.exports = server;
