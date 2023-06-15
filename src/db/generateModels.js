const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("billiv_test", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  directory: "../models",
  additional: {
    timestamps: false,
  },
});

auto.run((err) => {
  if (err) {
    throw err;
  }
  console.log(auto.tables); // Affiche les tables de la base de données
  console.log(auto.foreignKeys); // Affiche les clés étrangères de la base de données
});
