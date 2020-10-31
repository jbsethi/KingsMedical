'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.createTable('actions', { 
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
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
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
      // defaultValue: Sequelize.NOW,
      onUpdate : Sequelize.NOW,
      allowNull: true,
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

    return queryInterface.dropTable('actions');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};