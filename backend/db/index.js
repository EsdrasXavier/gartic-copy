const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Theme = require('../models/Theme');
const User = require('../models/User');
const DrawnOption = require('../models/DrawnOption');

const connection = new Sequelize(dbConfig);

// TODO: Avoid this copy and paste.
Theme.init(connection);
User.init(connection);
DrawnOption.init(connection);

DrawnOption.associate(connection.models);

module.exports = connection;