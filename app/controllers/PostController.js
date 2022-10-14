const { Post } = require('../models/index.js');

module.exports = {

    find: async (req, res, next) => {
        let post = await Post.findByPk(req.params.id);

        if (!post) {
            res.status(404).json({ msg: "Esta publicacion no existe" })
        } else {
            req.post = post;
            next();
        }
    },

    //Ver todos los Posts
    findAllPosts: async (req, res) => {

        let posts = await Post.findAll();

        res.json({ posts, });
    },

    //Ver un post en especifico
    findOnePost: async (req, res) => {
        res.json(req.post)
    },

    //Crear un post
    createPost: async (req, res) => {

        const { title, body, userId } = req.body;

        const newPost = await Post.create({
            title: title,
            body: body,
            userId: userId,
        })

        if (!newPost) {
            res.status(404).status({ msg: 'Error al crear la publicacion' });
        } else {
            res.json(newPost);
        }
    },

    //Actualizar un post
    updatePost: async (req, res) => {

        req.post.title = req.body.title;
        req.post.body = req.body.body;

        req.post.save().then(post => {
            res.json(post);
        })

    },

    //Borrar un post
    deletePost: async (req, res) => {

        req.post.destroy().then(result => {
            res.json({ msg: "La publicacion ha sido eliminada" });
        })
    }
}
