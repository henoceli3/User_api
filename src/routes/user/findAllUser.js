const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/user", async (req, res) => {
    try {
      // Recherche d'un utilisateur par nom
      if (req.query.nom) {
        const nom = req.query.nom;
        const limit = parseInt(req.query.LIMIT) || 5;

        // Vérifier que le terme de recherche contient au moins 2 caractères
        if (nom.length < 2) {
          const message = "La recherche doit contenir au moins 2 caractères";
          return res.status(400).json({ message });
        }

        const { count, rows } = await models.utilisatueur.findAndCountAll({
          where: {
            nom: {
              [Op.like]: `%${nom}%`,
            },
          },
          order: ["nom"],
          limit: limit,
        });

        const message = `Il y a ${count} utilisateur(s) qui correspondent au terme de recherche "${nom}"`;
        return res.json({ message, data: rows });
      }

      // Récupération de tous les utilisateurs
      const users = await models.utilisatueur.findAll({
        order: ["id"],
      });
      const message = `La liste de ${users.length} utilisateurs a été récupérée avec succès`;
      return res.json({ message, data: users });
    } catch (error) {
      const message =
        "Une erreur est survenue lors de la récupération de la liste des utilisateurs";
      return res.status(500).json({ message, data: error });
    }
  });
};
