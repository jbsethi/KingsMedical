module.exports = (sequelize, DataTypes) => {
    return sequelize.define('LabService', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      labId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      serviceId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(11),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
        defaultValue: DataTypes.NOW,
        onUpdate : DataTypes.NOW,
        allowNull: true,
        onUpdate: DataTypes.NOW
      },
      live: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    { 
      tableName: 'labs-services'
    });
}