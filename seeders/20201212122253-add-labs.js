'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'labs', [
        {
          name: 'Victoria',
          image: null,
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

    return queryInterface.bulkDelete('labs', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
