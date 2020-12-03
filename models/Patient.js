
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('Patient', {
      id : {
        type: Datatypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type: Datatypes.STRING(),
        allowNull: false,
      },
      gender : {
        type: Datatypes.STRING(),
        allowNull: false,
      },
      contact : {
        type: Datatypes.STRING(),
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
      tableName: 'patients'
    });
}