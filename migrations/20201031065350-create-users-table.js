'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.createTable('users', { 
    id : {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    image: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    emiratesId : {
      type: Sequelize.STRING(),
      allowNull: false,
      unique: true
    },
    email : {
      type: Sequelize.STRING(),
      allowNull: true,
      unique: true
    },
    name : {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    username : 
    {
      type: Sequelize.STRING(),
      allowNull: false,
      unique: true
    },
    password : {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    contact : {
      type: Sequelize.STRING(),
      allowNull: true,
    },
    role : {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    labId : {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    remarks : {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    active : {
      type: Sequelize.BOOLEAN(),
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
      defaultValue: true    }
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

    return queryInterface.dropTable('users');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
