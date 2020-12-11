'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
    'permissions',[

      // Adding Orders permissions
      {
        resourceId: 1,
        actionId: 1,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 1,
        actionId: 2,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 1,
        actionId: 3,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 1,
        actionId: 4,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 1,
        actionId: 5,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },

      // Adding Labs permissions
      {
        resourceId: 2,
        actionId: 1,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 2,
        actionId: 2,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 2,
        actionId: 3,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 2,
        actionId: 4,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 2,
        actionId: 5,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },

      // Adding Services permissions
      {
      resourceId: 3,
      actionId: 1,
      description: 'Description',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
      },
      {
        resourceId: 3,
        actionId: 2,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 3,
        actionId: 3,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 3,
        actionId: 4,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 3,
        actionId: 5,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },

      // Adding Users permissions
      {
      resourceId: 4,
      actionId: 1,
      description: 'Description',
      active: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      live: 1
      },
      {
        resourceId: 4,
        actionId: 2,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 4,
        actionId: 3,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 4,
        actionId: 4,
        description: 'Description',
        active: 1,
        createdBy: 1,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: new Date(),
        live: 1
      },
      {
        resourceId: 4,
        actionId: 5,
        description: 'Description',
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
