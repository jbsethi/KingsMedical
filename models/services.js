module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Service', {
      id : {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(),
        allowNull: true
      },
      replaceInterval: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(11),
        allowNull: false,
      },
      serviceType: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      active : {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        onUpdate : DataTypes.NOW,
        allowNull: true,
      },
      live: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true    
      }
    },
    { 
      tableName: 'services'
    });
}