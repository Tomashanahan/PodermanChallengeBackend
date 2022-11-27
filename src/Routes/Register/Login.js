require("dotenv").config();
const {Router} = require("express");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const {User} = require("../../db");
const {generarJWT} = require("../../herpers/generarJWT");

const router = Router();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

// eslint-disable-next-line no-unused-vars
router.delete("/", (req, res) => {
  // cloudinary.api.delete_resources_by_prefix('PodermanImages', function(result){ res.json(result) });
  cloudinary.api.delete_all_resources();
});

router.post("/", async (req, res) => {
  try {
    const {email, password} = req.body;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      cloudinaryConfig.api_secret,
    );

    //Busca el user
    const checkIfUserExists = await User.findOne({
      where: {email},
    });

    if (!checkIfUserExists) {
      const error = new Error("El usuario no existe");

      return res.status(404).json({msg: error.message});
    }

    // Comprobar passfrom con pass hash
    const comprobarPassword = async function (_password, hash) {
      return bcrypt.compareSync(_password, hash);
    };

    if (await comprobarPassword(password, checkIfUserExists.hashedPassword)) {
      //autenticar -JWT
      res.json({
        id: checkIfUserExists.id,
        fullName: checkIfUserExists.fullName,
        email: checkIfUserExists.email,
        team: checkIfUserExists.team,
        rol: checkIfUserExists.rol,
        token: generarJWT(checkIfUserExists),
        cloudinaryInfo: {timestamp, signature},
      });
    } else {
      return res.status(403).json({msg: "Password incorrecto"});
    }
  } catch (error) {
    res.status(404).json({msg: `Error el usuario no existe ${error}`});
  }
});

module.exports = router;
