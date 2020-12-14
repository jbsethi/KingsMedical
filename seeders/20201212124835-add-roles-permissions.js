'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('roles_has_permissions', null);
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('roles_has_permissions', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
