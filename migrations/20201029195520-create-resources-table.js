'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.createTable('resources', { 
    id : {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name : {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    active : {
      type: Sequelize.BOOLEAN(),
      defaultValue: true,
      allowNull: true,
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate : Sequelize.NOW,
      allowNull: false,
      onUpdate: Sequelize.NOW
    },
    live: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true    
    }
  },{
    timestamp: true,
    updatedAt: 'updateTimestamp'
  });

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('resources');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};