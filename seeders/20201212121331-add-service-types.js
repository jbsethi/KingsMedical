'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'services_types', [
        {
          name: 'Work Cases',
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Work Types',
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Others',
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

    return queryInterface.bulkDelete('services_types', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
