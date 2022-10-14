let jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.js');
const { User } = require('../app/models/index.js');

module.exports = {

  userSigned: (req, res, next) => {

    //Comprobar si existe el token
    if (!req.headers.authorization) {
      res.status(401).json({ msg: "Acceso denegado, el usuario no ha iniciado sesión" });
    } else {
      //Comprobar la validez del token
      let token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          res.status(500).json({ msg: "Ha ocurrido un error al decodificar el token", err })
        } else {
          req.user = decoded.user;
          next()
        }
      })
    }
  }
}