const { Model, DataTypes } = require('sequelize');

class DrawnOption extends Model {
  static init(sequelize) {
    super.init({
      object: DataTypes.STRING,
    }, {
      tableName: 'drawn_option',
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Theme, { foreignKey: 'theme_id', as: 'theme' });
  }
}

module.exports = DrawnOption;