const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Clientes = require("../model/clientes");
const bcrypt = require("bcryptjs");

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (req, res) => {
  const { name, password: passwordEntry } = req.body;
  const user = Clientes.find(e => e.nome == name)

  if (!user) {
    return res.status(401).json({ error: 'user not found' });
  }

  const { id, nome, hashPass } = user;

  try {
    checkPassword(passwordEntry, hashPass);
  } catch (e) {
    return res.status(401).json({ error: 'password does not match' });
  }

  try {
    return res.json({
      user: {
        id,
        nome,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  } catch (e) {
    return res.status(401).json({ error: 'erro' });
  }
}