'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.createTable('orders', { 
    id : {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    patientId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    patientEmiratesId : {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    sentDate: {
      type: Sequelize.DATE(),
      allowNull: true,
    },
    returnDate: {
      type: Sequelize.DATE(),
      allowNull: true,
    },
    notes : {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    shadeId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    urgent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    labId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    parentId:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    status:{
      type: Sequelize.STRING(),
      allowNull: false,
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

    return queryInterface.dropTable('orders');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
