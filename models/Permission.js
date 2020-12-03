module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Permission', {
      id : {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      resourceId: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
      actionId: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(),
        allowNull: true
      },
      active : {
        type: DataTypes.BOOLEAN(),
        defaultValue: true,
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
      tableName: 'permissions'
    });
}