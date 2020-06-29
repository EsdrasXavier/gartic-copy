const express = require('express');
const ThemeController = require('../controllers/ThemeController');
const UserController = require('../controllers/UserController');
const DrawnOptionController = require('../controllers/DrawnOptionController');
const auth = require('../controllers/auth')();

const routes = express.Router();

routes.get('/theme', ThemeController.index);
routes.post('/theme', ThemeController.store);
routes.delete('/theme/:theme_id', ThemeController.delete);
routes.put('/theme/:theme_id', ThemeController.update);

routes.get('/theme/:theme_id/drawnoption', DrawnOptionController.findByThemeId);
routes.post('/theme/:theme_id/drawnoption', DrawnOptionController.store);

routes.delete('/drawnoption/:drawnoption_id', DrawnOptionController.delete);
routes.put('/drawnoption/:drawnoption_id', DrawnOptionController.update);


routes.get('/user', UserController.index);
routes.post('/user', UserController.store);

routes.post('/login', UserController.findOne)

routes.get("/test", auth.authenticate());


routes.get('/drawnoption', DrawnOptionController.index);

module.exports = routes;