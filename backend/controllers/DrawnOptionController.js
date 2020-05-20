const Theme = require('../models/Theme');
const DrawnOption = require('../models/DrawnOption');

module.exports = {
  async index(req, res) {
    const drawOptions = await DrawnOption.findAll();

    return res.json(drawOptions);
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