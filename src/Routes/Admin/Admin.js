const {Router} = require("express");

const {User} = require("../../db");
const {CasaPrincipal} = require("../../db");
const {ExAgroinsumos} = require("../../db");
const {Taller} = require("../../db");
const {Hangar} = require("../../db");
const {Oficina} = require("../../db");
const {Balanza} = require("../../db");
const {Agroinsumos} = require("../../db");
const {Camaras} = require("../../db");

const router = Router();

router.get("/getAllInformation", async (req, res) => {
  const casaPrincipal = await CasaPrincipal.findAll(
    {include: User},
    {order: [["createdAt", "DESC"]]},
  );
  const exAgroinsumos = await ExAgroinsumos.findAll(
    {include: User},
    {order: [["createdAt", "DESC"]]},
  );
  const taller = await Taller.findAll({include: User}, {order: [["createdAt", "DESC"]]});
  const hangar = await Hangar.findAll({include: User}, {order: [["createdAt", "DESC"]]});
  const oficina = await Oficina.findAll({include: User}, {order: [["createdAt", "DESC"]]});
  const balanza = await Balanza.findAll({include: User}, {order: [["createdAt", "DESC"]]});
  const agroinsumos = await Agroinsumos.findAll({include: User}, {order: [["createdAt", "DESC"]]});
  const camaras = await Camaras.findAll({include: User}, {order: [["createdAt", "DESC"]]});

  res.json({
    casaPrincipal,
    exAgroinsumos,
    taller,
    hangar,
    oficina,
    balanza,
    agroinsumos,
    camaras,
  });
});

module.exports = router;
