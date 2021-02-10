
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('Order', {
      id : {
        type: Datatypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      patientId:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      patientEmiratesId : {
        type: Datatypes.STRING(),
        allowNull: false,
      },
      urgent: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
      },
      sentDate: {
        type: Datatypes.DATE(),
        allowNull: true,
      },
      returnDate: {
        type: Datatypes.DATE(),
        allowNull: true,
      },
      notes : {
        type: Datatypes.STRING(500),
        allowNull: true,
      },
      shadeId:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      labId:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      parentId:{
        type: Datatypes.INTEGER(11),
        allowNull: true,
      },
      status:{ // placed - confirmed - completed 
        type: Datatypes.STRING(),
        allowNull: false,
      },
      price:{
        type: Datatypes.INTEGER(),
        allowNull: true,
      },
      createdBy: {
        type: Datatypes.INTEGER(11),
        allowNull: true,
      },
      updatedBy: {
        type: Datatypes.INTEGER(11),
        allowNull: true,
      },
      live: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: true    
      }
    },{ 
      tableName: 'orders'
    });
}