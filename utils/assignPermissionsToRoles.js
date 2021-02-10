const path = require('path');
const dotenv = require('dotenv');

let currentDir = __dirname;
currentDir = currentDir.split(path.sep);
currentDir.pop();
currentDir = currentDir.join(path.sep);

dotenv.config({ path: currentDir + path.sep + '.env' });

// IMPORTING DATABASE
const DB = require('../models/index');

// Actions
let Create = 1, Update = 2, Delete = 3, GetSingle = 4, GetAll = 5;

// Resources
let Orders = 1, Labs = 2, Services = 3, Users = 4, Roles = 5, 
    ServiceTypes = 6, PonticDesigns = 7, Shades = 8, Tooths = 9, 
    Invoices = 10;

// Roles
let SuperAdmin = 1, Administrator = 2, Doctor = 3, Management = 4, Lab = 5;

const permissions = {
    [SuperAdmin]: [
        { [Orders]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Labs]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Services]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Users]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Roles]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [ServiceTypes]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [PonticDesigns]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Shades]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Tooths]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Invoices]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
    ],
    [Administrator]: [
        { [Orders]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Labs]: [
            {permission: Create, status: false},
            {permission: Update, status: true},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Services]: [
            {permission: Create, status: false},
            {permission: Update, status: true},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Users]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Roles]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [ServiceTypes]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [PonticDesigns]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Shades]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Tooths]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Invoices]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
    ],
    [Management]: [
        { [Orders]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Labs]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Services]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Users]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [Roles]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [ServiceTypes]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [PonticDesigns]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Shades]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Tooths]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Invoices]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
    ],
    [Doctor]: [
        { [Orders]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Labs]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: true},
        ] },
        { [Services]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Users]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [Roles]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [ServiceTypes]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [PonticDesigns]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Shades]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Tooths]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Invoices]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
    ],
    [Lab]: [
        { [Orders]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Labs]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [Services]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Users]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [Roles]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: false},
            {permission: GetAll, status: false},
        ] },
        { [ServiceTypes]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [PonticDesigns]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Shades]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Tooths]: [
            {permission: Create, status: false},
            {permission: Update, status: false},
            {permission: Delete, status: false},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
        { [Invoices]: [
            {permission: Create, status: true},
            {permission: Update, status: true},
            {permission: Delete, status: true},
            {permission: GetSingle, status: true},
            {permission: GetAll, status: true},
        ] },
    ],
}

const Interval = setInterval(async () => {

    if(DB.hasOwnProperty('RolePermission')){
        clearInterval(Interval);

        try{

            let removedPermissions = await emptyPermissions();
            console.log(removedPermissions);

            let newPermissions = await setNewPermissions();
            console.log(newPermissions);

            // Clossing connection to database
            DB.sequelize.close();

        }
        catch(Exc){
            console.log(Exc);
        }
        
    }
    else{
        console.log('Refreshing connection with database.');
    }

}, 1000);


function emptyPermissions(){
    return new Promise(async (resolve, reject) => {
        let Permissions = await DB.RolePermission.destroy({ truncate: true });

        // console.log('Permissions:', Permissions);

        if(Permissions || Permissions == 0){
            resolve('[Success] Current permissions removed.');
        }
        else {
            reject('[Error] Failed to remove previous permissions.');
        }
        
    });
}

function setNewPermissions(){
    return new Promise(async (resolve, reject) => {
        
        for(let [Role, Resources] of Object.entries(permissions)){
            // console.log(Resources);
            for(let ResourceActions of Resources){
                for(let [Resource, Actions] of Object.entries(ResourceActions)){
                   
                    for(let Action of Actions){
                        
                        try{

                            let Permission = await DB.Permission.findOne({
                                where: {
                                    resourceId: Resource,
                                    actionId: Action.permission
                                }
                            });

                            if(Permission){

                                let values = Permission.dataValues;
                                let obj = {
                                    roleId: Role,
                                    permissionId: values.id,
                                    createdBy: 1,
                                    live: Action.status,
                                }

                                let AssignPermission = await DB.RolePermission.create(obj);

                                if(!AssignPermission){
                                    console.log(`[ERROR] Failed to add PERMISSION:${values.id}  to role:${Role}`);
                                }

                            }
                            else{
                                console.log(`[Error] Permission not found against RESOURCE:${Resource} and ACTION:${Action.permission}`);
                            }
    
                            
                        }
                        catch(Exc){
                            console.log(Exc)
                        }
                        
                    }
                }
            }
        }

        resolve('[Success] New permissions assigned successfully');
    });
}
