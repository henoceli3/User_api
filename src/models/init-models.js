var DataTypes = require("sequelize").DataTypes;
var _utilisatueur = require("./utilisatueur");

function initModels(sequelize) {
  var utilisatueur = _utilisatueur(sequelize, DataTypes);


  return {
    utilisatueur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
