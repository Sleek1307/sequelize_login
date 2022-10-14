'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Post, { as: 'article', foreignKey: 'userId' });
      User.belongsToMany(models.Role, { as: "roles", through: "user_role", foreignKey: "user_id" })
    }

    static isAdmin(role) {
      let tmpArray = [];
      role.forEach(role => tmpArray.push(role.role));

      return tmpArray.includes('admin');
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 255],
          msg: "El nombre debe tener como minimo dos caracteres"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email debe ser un correo valido"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};