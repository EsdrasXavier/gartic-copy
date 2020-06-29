const Theme = require('../models/Theme');
const DrawnOption = require('../models/DrawnOption');

module.exports = {
  async index(req, res) {
    const drawOptions = await DrawnOption.findAll();

    return res.json(drawOptions);
  },

  async findByThemeId(req, res) {
    const { theme_id } = req.params;
    const drawOptions = await DrawnOption.findAll({ where: { theme_id } });

    return res.json(drawOptions);
  },

  async delete(req, res) {
    const { drawnoption_id } = req.params;
    const drawnOption = await DrawnOption.destroy({ where: { id: drawnoption_id } });
    return res.json(drawnOption);
  },

  async update(req, res) {
    const { drawnoption_id } = req.params;
    const { name } = req.body;

    const drawnOption = await DrawnOption.findByPk(drawnoption_id);

    if (!drawnOption) {
      return res.status(400).json({ error: 'Theme not found' });
    }

    const newDrawnOption = await drawnOption.update({ object: name });

    return res.json(newDrawnOption);
  },

  async store(req, res) {
    const { theme_id } = req.params;
    const { name } = req.body;

    const theme = await Theme.findByPk(theme_id);

    if (!theme) {
      return res.status(400).json({ error: 'Theme not found' });
    }

    const drawnObj = await DrawnOption.create({ theme_id, object: name });

    return res.json(drawnObj);
  }
}