const {Router} = require("express");
const bcrypt = require("bcrypt");

const {User} = require("../../db");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {fullName, email, password, team, rol} = req.body;
    //Previene usuarios registrados
    const serarchigExistingUser = await User.findOne({
      where: {email},
    });

    if (serarchigExistingUser) {
      const error = new Error("El correo ya existe");

      return res.status(400).json({msg: error.message});
    } else {
      //Hash pass
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Crea nuevo user
      const newUser = await User.create({
        fullName,
        email,
        hashedPassword,
        team,
        rol: rol ?? "User",
      });

      // res.json("Usuario creado correctamente");
      res.json(newUser);
    }
  } catch (error) {
    res.status(400).send(`El correo ya existe ${error}`);
  }
});

module.exports = router;
