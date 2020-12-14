'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'shades', [
        {
          name: 'Shade',
          value: 'Shade',
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('shades', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
