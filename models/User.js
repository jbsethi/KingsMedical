
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('User', {
      id : {
        type: Datatypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      image: {
        type: Datatypes.STRING(500),
        allowNull: true,
      },
      userId : {
        type: Datatypes.STRING(),
        allowNull: false,
        unique: true
      },
      email : {
        type: Datatypes.STRING(),
        allowNull: true,
        unique: true
      },
      name : {
        type: Datatypes.STRING(),
        allowNull: false,
      },
      username : 
      {
        type: Datatypes.STRING(),
        allowNull: false,
        unique: true
      },
      password : {
        type: Datatypes.STRING(500),
        allowNull: false,
      },
      contact : {
        type: Datatypes.STRING(),
        allowNull: true,
      },
      role : {
        type: Datatypes.INTEGER(11),
        allowNull: false,
      } ,
      remarks : {
        type: Datatypes.STRING(500),
        allowNull: true,
      },
      active : {
        type: Datatypes.BOOLEAN,
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
      tableName: 'users'
    });
}