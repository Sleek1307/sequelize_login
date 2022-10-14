'use strict';

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const { User } = require('../../models/index.js');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let users = [];
    let posts = []

    for (let i = 0; i < 20; i++) {
      users.push({ name: faker.name.fullName(), password: bcrypt.hashSync('12345678', 10), email: faker.internet.email() });
    }

    await queryInterface.bulkInsert('users', users, {});

    users = await User.findAll();
    users.forEach(user => {
      posts.push({
        title: faker.lorem.words(),
        body: faker.lorem.words(40),
        userId: user.id
      })
    })

    await queryInterface.bulkInsert('posts', posts, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     * 
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('posts', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
};
