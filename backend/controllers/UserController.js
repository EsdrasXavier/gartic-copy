const User = require('../models/User');
var jwt = require("jwt-simple");
var cfg = require("../config/config.js");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async findOne(req, res) {
    const { email, password } = req.body;

    if (email && password) {
      var user = await User.findOne({
        where: { email, password: String(password) }
      });

      if (user) {
        var payload = { id: user.id };
        var token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
          id: user.id,
          email: user.email,
          role: user.role,
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },


  async store(req, res) {
    const { name, password, email } = req.body;
    const user = await User.create({ name, password, email, role: 'user' });

    return res.json(user);
  }
};


// function (req, res) {
//   const { email, password } = req.body;
//   console.log(email, password)
//   if (email && password) {
//     var user = users.find(function (u) {
//       return u.email === email && u.password === password;
//     });
//     if (user) {
//       var payload = { id: user.id };
//       var token = jwt.encode(payload, cfg.jwtSecret);
//       res.json({ token: token });
//     } else {
//       res.sendStatus(401);
//     }
//   } else {
//     res.sendStatus(401);
//   }
// }