const express = require('express');
const ThemeController = require('../controllers/ThemeController');
const UserController = require('../controllers/UserController');
const DrawnOptionController = require('../controllers/DrawnOptionController');

const routes = express.Router();

routes.get('/theme', ThemeController.index);
routes.post('/theme', ThemeController.store);
routes.post('/theme/:theme_id/drawnoption', DrawnOptionController.store);

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);

routes.get('/drawnoption', DrawnOptionController.index);


module.exports = routes;