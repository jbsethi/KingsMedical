'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'services', [
        {
          name: 'ZIRCON',
          replaceInterval: 30,
          // price: 50,
          serviceType: 1,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'PFM',
          replaceInterval: 30,
          // price: 50,
          serviceType: 1,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'EMAX',
          replaceInterval: 30,
          // price: 50,
          serviceType: 1,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'VENEER',
          replaceInterval: 30,
          // price: 50,
          serviceType: 1,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'NON-PREP VENEER',
          replaceInterval: 30,
          // price: 50,
          serviceType: 1,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Crown / Bridge',
          replaceInterval: 30,
          // price: 50,
          serviceType: 2,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Inlay / Onlay',
          replaceInterval: 30,
          // price: 50,
          serviceType: 2,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Post',
          replaceInterval: 30,
          // price: 50,
          serviceType: 2,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Telescopic',
          replaceInterval: 30,
          // price: 50,
          serviceType: 2,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Maryland Bridge',
          replaceInterval: 30,
          // price: 50,
          serviceType: 2,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Night Guard',
          replaceInterval: 30,
          // price: 50,
          serviceType: 3,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Diagnostic Wax Up',
          replaceInterval: 30,
          // price: 50,
          serviceType: 3,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Ortho',
          replaceInterval: 30,
          // price: 50,
          serviceType: 3,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
        {
          name: 'Denture',
          replaceInterval: 30,
          // price: 50,
          serviceType: 3,
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1
        },
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('services', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
