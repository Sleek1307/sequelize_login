const { Role, User } = require('../models/index.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authconfig = require('../../config/auth');

module.exports = {

  //Logueo
  signIn: (req, res) => {

    let { email, password } = req.body;

    //Buscar si el usuario existe
    User.findOne({
      where: {
        email: email,
      },
      include: 'roles'
    }).then(user => {

      if (!user) {
        res.status(404).json({ msg: "El usuario no existe" });
      } else {

        if (bcrypt.compareSync(password, user.password)) {
          //Retornar el token
          let token = jwt.sign({ user: user }, authconfig.secret, {
            expiresIn: authconfig.expires
          });

          res.json({
            user: user,
            token: token,
          });

        } else {
          res.status(401).json({ msg: "La contraseña es incorrecta" });
        }
      }
    }).catch(err => {
      res.status(500).json(err);
    });
  },

  //Cerrar sesion
  signOut: (req, res) => {
    res.json({msg: 'Sesion cerrada'})
  }, 

  //Registro
  signUp: (req, res) => {

    //Encripta contraseña
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authconfig.rounds));

    //Crea un usuario
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: password
    }).then(user => {
      let token = jwt.sign({ user: user }, authconfig.secret, {
        expiresIn: authconfig.expires
      });
      res.json({
        user: user,
        token: token,
      });
    }).catch(err => {
      res.status(500).json(err)
    })
  }
  

}