module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RolePermission', {
      id : {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.INTEGER(11),
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
      tableName: 'roles_has_permissions'
    });
}