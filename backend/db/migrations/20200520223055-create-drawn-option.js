'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drawn_option', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      theme_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'theme', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      object: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drawn_option');
  }
};
