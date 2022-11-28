const express = require("express");
const cors = require("cors");

const {db} = require("./src/db");
const routes = require("./src/Routes/index");

const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(cors());

server.use(express.json());
server.use("/", routes);

if (process.env.NODE_ENV === "test") {
  db.sync({force: true}).then(() => {
    server.listen(9090, () => {
      console.log("Server running on Port:", 9090);
    });
  });
} else {
  db.sync({force: false}).then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server running on Port:", process.env.PORT);
    });
  });
}

// db.sync({force: false}).then(() => {
//   if (process.env.NODE_ENV === "test") {
//     server.listen(9090, () => {
//       console.log("Server running on Port:", 9090);
//     });
//   } else {
//     server.listen(process.env.PORT, () => {
//       // console.log("Server running on Port:", process.env.PORT);
//     });
//   }
// });

module.exports = server;
