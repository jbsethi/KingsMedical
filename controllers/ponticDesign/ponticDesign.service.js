var db = require('../../models');
const { Pagination } = require('../../functions');

let Model = db.PonticDesign;

exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, Model, association);

    return {
        DB_value: result
    };

}

exports.GetEachAndEvery = async function () {
    
    let PonticDesign = await Model.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: PonticDesign
    };
}

exports.GetAllActive = async function () {
    
    let PonticDesign = await Model.findAll({
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
        DB_value: PonticDesign
    };
}

exports.Get = async function ( _ID ) {

    let PonticDesign = await Model.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!PonticDesign){

        let error = new Error("Pontic Design not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: PonticDesign
    };

}

exports.Create = async (_OBJECT) => {

    let result = await Model.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let PonticDesign = await Model.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!PonticDesign){

        let error = new Error("Pontic Design not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    if(_OBJECT.image != 'null' && _OBJECT.image != null && _OBJECT.image != ''){
        PonticDesign.image = _OBJECT.image;
    }

    PonticDesign.name = _OBJECT.name;
    PonticDesign.value = _OBJECT.value;
    PonticDesign.description = _OBJECT.description;
    PonticDesign.active = _OBJECT.active;
    PonticDesign.updatedBy = _OBJECT.updatedBy;

    let result = await PonticDesign.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let PonticDesign = await Model.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!PonticDesign){

        let error = new Error("Pontic Design not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    PonticDesign.live = false;
    let result = await PonticDesign.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}