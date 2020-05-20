const Theme = require('../models/Theme');

module.exports = {
  async index(req, res) {
    const themes = await Theme.findAll();

    return res.json(themes);
  },


  async store(req, res) {
    const { name } = req.body;
    const theme = await Theme.create({name});

    return res.json(theme);
  }
}