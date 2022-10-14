'use strict';

const { User } = require('../../models/index');
const role = require('../../models/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('roles', [
      { role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { role: 'user', createdAt: new Date(), updatedAt: new Date() }
    ], {})

    let users = await User.findAll();
    let roles = []

    users.map((user, index) => {
      if (index <= 5) {
        roles.push({
          user_id: user.id,
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      } else {
        roles.push({
          user_id: user.id,
          role_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    })

    queryInterface.bulkInsert('user_role', roles, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
