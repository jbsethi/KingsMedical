'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'actions', [
    {
      name: 'Create',
      description: 'This action is to create a resource',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
    },
    {
      name: 'Update',
      description: 'This action is to update a resource',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
    },
    {
      name: 'Delete',
      description: 'This action is to delete a resource',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
    },
    {
      name: 'GetSingle',
      description: 'This action is to get single resource',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
    },
    {
      name: 'GetAll',
      description: 'This action is to get all resources',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
