require('dotenv').config();

module.exports = {

  //Database configuration
  "username": process.env.DB_USERNAME || "root",
  "password": process.env.DB_PASSWORD || null,
  "database": process.env.DB_DATABASE || "auth",
  "host": process.env.DB_HOST || "127.0.0.0",
  "dialect": process.env.DB_DIALECT || "mysql",

  //Configurar seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  //Configuracion de migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migirations"
}
 