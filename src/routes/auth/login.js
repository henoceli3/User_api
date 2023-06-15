const { models } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const privateKey = require("../../auth/private_key");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    await models.utilisatueur
      .findOne({ where: { telephone: req.body.telephone } })
      .then(async (user) => {
        if (!user) {
          const message = "L'utilisateur demandé n'existe pas !";
          return res.status(404).json({ message });
        }

        await bcrypt.compare(req.body.mdp, user.mdp).then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe entré est incorrect`;
            return res.status(401).json({ message });
          }
          // jwt
          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = `L'utilisateur a été connecté avec succès`;

          return res.json({ message, data: user, token });
        });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};
