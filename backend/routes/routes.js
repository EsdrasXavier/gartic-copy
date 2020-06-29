const express = require('express');
const ThemeController = require('../controllers/ThemeController');
const UserController = require('../controllers/UserController');
const DrawnOptionController = require('../controllers/DrawnOptionController');
const passport = require('passport');
const { Router } = require('express');
const auth = require('../controllers/auth')();

const routes = express.Router();

routes.get('/theme', ThemeController.index);
routes.post('/theme', ThemeController.store);
routes.post('/theme/:theme_id/drawnoption', DrawnOptionController.store);

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);

routes.post('/login', UserController.findOne)

routes.get("/test", auth.authenticate());


routes.get('/drawnoption', DrawnOptionController.index);

module.exports = routes;