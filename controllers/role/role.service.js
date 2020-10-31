var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Role, association);

    return {
        DB_value: result
    };
}

exports.GetEachAndEvery = async function () {
    
    let Role = await db.Role.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Role
    };
}

exports.GetAllActive = async function () {
    
    let Role = await db.Role.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true,
            active: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Role
    };
}

exports.Get = async function ( _ID ) {

    let Role = await db.Role.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Role){

        let error = new Error("Role not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Role
    };

}

exports.Create = async (_OBJECT) => {

    let result = await db.Role.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Role = await db.Role.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Role){

        let error = new Error("Role not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }


    Role.title = _OBJECT.title;
    Role.sequence = _OBJECT.sequence;
    Role.description = _OBJECT.description;
    Role.active = _OBJECT.active;
    Role.updatedBy = _OBJECT.updatedBy;

    let result = await Role.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let Role = await db.Role.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Role){

        let error = new Error("Role not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Role.live = false;
    let result = await Role.save()

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}