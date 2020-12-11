var db = require('../../models');
const { Pagination } = require('../../functions');

exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Shade, association);

    return {
        DB_value: result
    };

}

exports.GetEachAndEvery = async function () {
    
    let Shade = await db.Shade.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Shade
    };
}

exports.GetAllActive = async function () {
    
    let Shade = await db.Shade.findAll({
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
        DB_value: Shade
    };
}

exports.Get = async function ( _ID ) {

    let Shade = await db.Shade.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Shade){

        let error = new Error("Shade not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Shade
    };

}

exports.Create = async (_OBJECT) => {

    let result = await db.Shade.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Shade = await db.Shade.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Shade){

        let error = new Error("Shade not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    if(_OBJECT.image != 'null' && _OBJECT.image != null && _OBJECT.image != ''){
        Shade.image = _OBJECT.image;
    }

    Shade.name = _OBJECT.name;
    Shade.value = _OBJECT.value;
    Shade.description = _OBJECT.description;
    Shade.active = _OBJECT.active;
    Shade.updatedBy = _OBJECT.updatedBy;

    let result = await Shade.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let Shade = await db.Shade.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Shade){

        let error = new Error("Shade not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Shade.live = false;
    let result = await Shade.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}