'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// LOADING THE ENVIORMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, { 
  host: process.env.DB_HOST, 
  dialect: 'mysql',
  logging: false,
  timezone: '+05:00', //fron writing into database
  // dialectOptions: {
  //   // useUTC: false, //for reading from database
  //   timezone: "+05:00"
  // },
  // timezone: 'Asia/Karachi'
});


sequelize.authenticate()
.then(()=>{ 
    console.log('[DATABASE] Connection successfull.');
    
    fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file != 'index.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    // Associations
    db.User.belongsTo(db.Role, {foreignKey: 'role'});
    db.Service.belongsTo(db.ServiceType, {foreignKey: 'serviceType'});

    db.Order.hasMany(db.OrderTooth, {as: 'tooths'});
    db.OrderTooth.hasMany(db.OrderToothService, {as: 'ToothServices'});
    db.OrderTooth.hasMany(db.OrderToothPonticDesign, {as: 'ToothPonticDesign'});

    // Including Patient in order
    db.Order.belongsTo(db.Patient,  {as: 'Patient', foreignKey: 'patientId'});
    // Include Sahde in Order
    db.Order.belongsTo(db.Shade,  {as: 'Shade', foreignKey: 'shadeId'});
    // Include Tooth in Order from Ordertooth Table
    db.OrderTooth.belongsTo(db.Tooth, {as: 'Tooth', foreignKey: 'toothId'});
    // Include Services in Order from OrderToothServices Table
    db.OrderToothService.belongsTo(db.Service, {as: 'Service', foreignKey: 'serviceId'});
    // Include Services in Order from OrderToothServices Table
    db.OrderToothPonticDesign.belongsTo(db.PonticDesign, {as: 'PonticDesign', foreignKey: 'ponticDesignId'});

    // Synchronization
    sequelize.sync()
    .then(() => {
        console.log('[DATABASE] Synchronising successfull');
    })
    .catch((error) => {  
        console.log('[DATABASE] Synchronising failed\n Error =>');
    });

})
.catch(( ERROR )=>{ console.log('[DATABASE] Connection failed'); })


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
