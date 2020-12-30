var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.ServiceType, association);

    return {
        DB_value: result
    };
}

exports.GetEachAndEvery = async function () {
    
    let ServiceType = await db.ServiceType.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: ServiceType
    };
}

exports.GetAllActive = async function () {
    
    let ServiceType = await db.ServiceType.findAll({
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
        DB_value: ServiceType
    };
}

exports.Get = async function ( _ID ) {

    let ServiceType = await db.ServiceType.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!ServiceType){

        let error = new Error("Service Type not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: ServiceType
    };

}

exports.Create = async (_OBJECT) => {

    let result = await db.ServiceType.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let ServiceType = await db.ServiceType.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!ServiceType){

        let error = new Error("Service Type not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }


    ServiceType.name = _OBJECT.name;
    ServiceType.description = _OBJECT.description;
    ServiceType.active = _OBJECT.active;
    ServiceType.updatedBy = _OBJECT.updatedBy;

    let result = await ServiceType.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let ServiceType = await db.ServiceType.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!ServiceType){

        let error = new Error("Service Type not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    ServiceType.live = false;
    let result = await ServiceType.save()

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}

exports.GetServicesByServiceType = async function ( _ID ) {

    let ServiceType = await db.ServiceType.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!ServiceType){

        let error = new Error("Service Type not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Services = await db.Service.findAll({
        where: {
            live: true,
            serviceType: _ID
        }
    });

    return {
        DB_value: Services
    };

}