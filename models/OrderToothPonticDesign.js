
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('OrderToothPonticDesign', {
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
      ponticDesignId:{
        type: Datatypes.INTEGER(11),
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
      tableName: 'orders_tooths_pontic_designs'
    });
}