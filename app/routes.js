const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('../middlewares/auth.js');

//Controller 
const authConrtoller = require('./controllers/AuthController.js');
const postController = require('./controllers/PostController.js');

//Policies
const PostPolicy = require('./policies/PostPolicys.js');

router.get('/', (req, res) => {
    res.send({ message: 'Hola mundo' });
});

//Rutas de logueo y registro

//Login  => api/signin
router.post('/api/signin', authConrtoller.signIn);

//Registro => api/signup
router.post('/api/signup', authConrtoller.signUp);

//Rutas de Posts
router.post('/api/posts', auth.userSigned, postController.createPost)
router.get('/api/posts', auth.userSigned, postController.findAllPosts);
router.get('/api/posts/:id', auth.userSigned, postController.find, PostPolicy.show, postController.findOnePost);
router.patch('/api/posts/:id', auth.userSigned, postController.find, PostPolicy.update, postController.updatePost);
router.delete('/api/posts/:id', auth.userSigned, postController.find, PostPolicy.delete, postController.deletePost);



module.exports = router;