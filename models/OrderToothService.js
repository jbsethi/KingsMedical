
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('OrderToothService', {
      id : {
        type: Datatypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      orderToothId:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      serviceId:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      price:{
        type: Datatypes.INTEGER(11),
        allowNull: false,
      },
      charge: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
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
      tableName: 'orders_tooths_services'
    });
}