const Theme = require('../models/Theme');
const { update } = require('../models/Theme');

module.exports = {
  async index(req, res) {
    const themes = await Theme.findAll();

    return res.json(themes);
  },


  async store(req, res) {
    const { name } = req.body;
    const theme = await Theme.create({ name });

    return res.json(theme);
  },

  async delete(req, res) {
    const { theme_id } = req.params;
    const theme = await Theme.destroy({ where: { id: theme_id } });
    return res.json(theme);
  },


  async update(req, res) {
    const { theme_id } = req.params;
    const { name } = req.body;

    const theme = await Theme.findByPk(theme_id);

    if (!theme) {
      return res.status(400).json({ error: 'Theme not found' });
    }

    const newTheme = await theme.update({  name });

    return res.json(newTheme);
  }
}