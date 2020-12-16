module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Invoice', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      orderId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      labId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      description:{
        type: DataTypes.STRING(),
        allowNull: true,
      },
      attachment:{
        type: DataTypes.STRING(),
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
      tableName: 'invoices'
    });
}