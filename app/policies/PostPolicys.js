const { User } = require('../models/index.js');

module.exports = {
    show: (req, res, next) => {

        if (req.user.id === req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(404).json({ msg: "No estas autorizado para ver esta publicacion" })
        }
    },

    update: (req, res, next) => {
        if (req.user.id === req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(404).json({ msg: "No estas autorizado para actualizar esta publicacion" })
        }
    },

    delete: (req, res, next) => {

        if (req.user.id == req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(404).json({ msg: "No estas autorizado para eliminar esta publicacion" })
        }
    }
}