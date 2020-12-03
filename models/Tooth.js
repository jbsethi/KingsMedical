module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tooth', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value : {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
      tableName: 'tooths'
    });
}