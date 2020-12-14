'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles', [
      {
        title: 'Administrator',
        description: 'Admin role for the application user',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        title: 'Doctor',
        description: 'Doctor role for the application user',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        title: 'Management',
        description: 'Management role for the application user',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        title: 'Lab',
        description: 'Lab role for the application user',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('roles', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
