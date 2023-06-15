const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { models } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const user = await models.utilisatueur.findByPk(id);
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas";
        return res.status(404).json({ message });
      }

      // Crypter le mot de passe si présent dans la requête
      if (req.body.mdp) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.mdp, saltRounds);
        req.body.mdp = hashedPassword;
      }

      await models.utilisatueur.update(req.body, {
        where: { id: id },
      });

      const updatedUser = await models.utilisatueur.findByPk(id);
      const message = `L'utilisateur avec l'identifiant n°${updatedUser.id} a été modifié avec succès`;
      return res.status(200).json({ message, data: updatedUser });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la modification de l'utilisateur";
      return res.status(500).json({ message, data: error });
    }
  });
};
