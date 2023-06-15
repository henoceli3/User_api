const { ValidationError, UniqueConstraintError } = require("sequelize");
const { models } = require("../../db/sequelize");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    // Crypter le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.mdp, saltRounds);

    const user = await models.utilisatueur.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      telephone: req.body.telephone,
      photo_profile: req.body.photo_profile,
      fritte_alloco: req.body.fritte_alloco,
      mdp: hashedPassword,
    });

    const message = `L'utilisateur ${req.body.nom} a été créé avec succès`;
    console.log(user.toJSON());
    res.status(201).json({ message, data: user });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UniqueConstraintError
    ) {
      res.status(400).json({ message: error.message, data: error });
      return;
    }
    const message = `L'utilisateur ${req.body.nom} n'a pas été créé avec succès`;
    res.status(500).json({ message, data: error });
    console.log(error);
  }
};

module.exports = (app) => {
  app.post("/api/user", createUser);
};
