var db = require('../../models');
const { Pagination } = require('../../functions');

let Model = db.PonticDesign;

exports.getAllUsers = async function ( _PAGE, _LIMIT) {
    
    let where = {
        live: true
    }

    let association = {
        include: [{
            model: db.Role, // will create a left join
            attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt'] }
        }],
        where
    }

    let result = await Pagination(_PAGE, _LIMIT, Model, association);

    return {
        DB_value: result
    };
}

exports.Get = async function ( _ID ) {

    let where = {
        live: true,
        id: _ID,
    }

    let Order = await Model.findOne({
        attributes: { exclude: ['password'] },
        where
    });


    if(!Order){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Order
    };

}

exports.Create = async (_OBJECT) => {

        if( _OBJECT.labId ){

            let lab = await db.Lab.findOne({
                where: {
                    id: _OBJECT.labId,
                    live: true
                }
            });
    
            if(!lab){
    
                let error = new Error("Lab does not exists!");
                error.status = 400;
                return {
                    DB_error: error
                }; 
    
            }

        }

        let result = await Model.create(_OBJECT);

        delete result.dataValues.password;
        delete result.dataValues.createdBy;
        delete result.dataValues.updatedBy;
        delete result.dataValues.updatedAt;
        delete result.dataValues.live;

        return {
            DB_value: result
        };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let where = {
        live: true,
        id: _ID,
    }

    let User = await Model.findOne({
        where
    });


    if(!User){

        let error = new Error("User not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let emiratesId = await Model.findOne({
        where: {
            emiratesId: _OBJECT.emiratesId,
            id: { [db.Sequelize.Op.ne]: _ID },
            live: true
        }
    });

    if(emiratesId){

        let error = new Error("Emirates Id already exists!");
        error.status = 409;
        return {
            DB_error: error
        };

    }

    let username = await Model.findOne({
        where: {
            username: _OBJECT.username,
            id: { [db.Sequelize.Op.ne]: _ID },
            live: true
        }
    });

    if(username){

        let error = new Error("Username already exists!");
        error.status = 409;
        return {
            DB_error: error
        }; 

    }

    if(_OBJECT.email != null){
        let email = await Model.findOne({
            where: {
                email: _OBJECT.email,
                id: { [db.Sequelize.Op.ne]: _ID },
                live: true
            }
        });

        if(email){
            let error = new Error("Email already exists!");
            error.status = 409;
            return {
                DB_error: error
            }; 
        }
    }

    // Validation if role is present
    let role = await db.Role.findOne({
        where: {
            id: _OBJECT.role,
            live: true
        }
    });

    if(!role){

        let error = new Error("Role does not exists!");
        error.status = 400;
        return {
            DB_error: error
        }; 

    }

    if( _OBJECT.labId ){

        let lab = await db.Lab.findOne({
            where: {
                id: _OBJECT.labId,
                live: true
            }
        });

        if(!lab){

            let error = new Error("Lab does not exists!");
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    if(_OBJECT.image != 'null' && _OBJECT.image != null && _OBJECT.image != ''){
        User.image = _OBJECT.image;
    }

    User.emiratesId = _OBJECT.emiratesId;
    User.email = _OBJECT.email;
    User.name = _OBJECT.name;
    User.username = _OBJECT.username;
    User.contact = _OBJECT.contact;
    User.role = _OBJECT.role;
    User.labId = _OBJECT.labId;
    User.remarks = _OBJECT.remarks;
    User.active = _OBJECT.active;
    User.updatedBy = _OBJECT.updatedBy;

    let result = await User.save();

    delete result.dataValues.password;
    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async function ( _OBJECT, _ID ) {

    let where = {
        live: true,
        id: _ID,
    }

    // if(superman){
    //     where['id'] = { [db.Sequelize.Op.ne]: 1 }
    // }

    let User = await Model.findOne({
        attributes: { exclude: ['password'] },
        where
    });


    if(!User || (superman && _ID == 1) ){

        let error = new Error("User not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    User.live = false;
    User.updatedBy = _OBJECT.updatedBy;

    let result = await User.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;
    
    return {
        DB_value: result
    };

}