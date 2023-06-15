const { models } = require("../../db/sequelize");

const deleteUser = async (req, res) => {
  try {
    const user = await models.utilisatueur.findByPk(req.params.id);
    if (!user) {
      const message = "L'utilisateur demandé n'existe pas";
      return res.status(404).json({ message });
    }
    const userDeleted = await models.utilisatueur.destroy({
      where: { id: user.id },
    });
    const message = `L'utilisateur avec l'identifiant n°${user.id} a été supprimé avec succès`;
    return res.status(200).json({ message, data: user });
  } catch (error) {
    const message =
      "Une erreur est survenue lors de la suppression de l'utilisateur";
    return res.status(500).json({ message, data: error });
  }
};

module.exports = (app) => {
  app.delete("/api/user/:id", deleteUser);
};
