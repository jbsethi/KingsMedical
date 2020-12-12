'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'pontic_designs', [
        {
          name: 'Ovate',
          value: 'Ovate',
          image: null,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Point Contact',
          value: 'Point Contact',
          image: null,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'No Contact',
          value: 'No Contact',
          image: null,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'No Ridge',
          value: 'No Ridge',
          image: null,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Full Ridge',
          value: 'Full Ridge',
          image: null,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Moddified Ridge',
          value: 'Moddified Ridge',
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
