const express = require('express');
const app = express();
const { sequelize } = require('./models/index.js');

//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use(require('./routes.js'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);

    sequelize.authenticate().then(() => {
        console.log('Nos hemos conectado a la base de datos')
    })
});