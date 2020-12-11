var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Tooth, association);

    return {
        DB_value: result
    };

}

exports.GetEachAndEvery = async function () {
    
    let Tooths = await db.Tooth.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Tooths
    };
}

exports.GetAllActive = async function () {
    
    let Tooths = await db.Tooth.findAll({
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
        DB_value: Tooths
    };
}

exports.Get = async function ( _ID ) {

    let Tooth = await db.Tooth.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Tooth){

        let error = new Error("Tooth not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Tooth
    };

}

exports.Create = async (_OBJECT) => {

    let result = await db.Tooth.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Tooth = await db.Tooth.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Tooth){

        let error = new Error("Tooth not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    if(_OBJECT.image != 'null' && _OBJECT.image != null && _OBJECT.image != ''){
        Tooth.image = _OBJECT.image;
    }

    Tooth.name = _OBJECT.name;
    Tooth.value = _OBJECT.value;
    Tooth.description = _OBJECT.description;
    Tooth.active = _OBJECT.active;
    Tooth.updatedBy = _OBJECT.updatedBy;

    let result = await Tooth.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let Tooth = await db.Tooth.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Tooth){

        let error = new Error("Tooth not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Tooth.live = false;
    let result = await Tooth.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}