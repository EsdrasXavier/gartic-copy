const { Model, DataTypes } = require('sequelize');

class Theme extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      tableName: 'theme',
      sequelize,
    });
  }
}

module.exports = Theme;