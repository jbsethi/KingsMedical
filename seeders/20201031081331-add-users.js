'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users', [
        {
          name: 'Superman',
          username: 'superman',
          image: null,
          userId : '000000000000000',
          email : 'admin@superman.com',
          password : '$2a$10$O0/7pWlUwWzMGTTBhQb2Kei9vYpI8GD2jEvrSjpJbZqwrzmm5XQXy',
          contact : null,
          role : 1,
          remarks : 'Hidden administrator account',
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1,
        },
        {
          name: 'Administrator',
          username: 'administrator',
          image: null,
          userId : '0123456789012345',
          email : 'admin@kingsmedical.com',
          password : '$2a$10$X2p6XhkkSpRhSt9TwfFpi.r2M94JD66eL8iVaTPIb6w1DFzdxVh0O',
          contact : null,
          role : 1,
          remarks : 'Default admin user',
          active: 1,
          createdBy: 1,
          createdAt: new Date(),
          updatedBy: null,
          updatedAt: new Date(),
          live: 1,
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