var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        },
        include: [{
            model: db.ServiceType, // will create a left join
            attributes:  [ 'id', 'name', 'description' ] 
        }]
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Service, association);

    return {
        DB_value: result
    };
}

exports.GetEachAndEvery = async function () {
    
    let Service = await db.Service.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        include: [{
            model: db.ServiceType, // will create a left join
            attributes:  [ 'id', 'name', 'description' ] 
        }],
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Service
    };
}

exports.GetAllActive = async function () {
    
    let Service = await db.Service.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        include: [{
            model: db.ServiceType, // will create a left join
            attributes:  [ 'id', 'name', 'description' ] 
        }],
        where: {
            live: true,
            active: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Service
    };
}

exports.Get = async function ( _ID ) {

    let include = [{
            model: db.ServiceType, // will create a left join
            attributes:  [ 'id', 'name', 'description' ] 
    }];

    let Service = await db.Service.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        },
        include
    });


    if(!Service){

        let error = new Error("Service not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Service
    };

}

exports.Create = async (_OBJECT) => {

    let ServiceType = await db.ServiceType.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _OBJECT.serviceType,
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

    let result = await db.Service.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Service = await db.Service.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Service){

        let error = new Error("Service Type not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let ServiceType = await db.ServiceType.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _OBJECT.serviceType,
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


    Service.name = _OBJECT.name;
    Service.serviceType = _OBJECT.serviceType;
    Service.description = _OBJECT.description;
    Service.replaceInterval = _OBJECT.replaceInterval;
    // Service.price = _OBJECT.price;
    Service.active = _OBJECT.active;
    Service.updatedBy = _OBJECT.updatedBy;

    let result = await Service.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    let include = [{
        model: db.ServiceType, // will create a left join
        attributes:  [ 'id', 'name', 'description' ] 
    }];

    Service = await db.Service.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        },
        include
    });

    return {
        DB_value: Service
    };


}

exports.Delete = async ( _ID ) => {

    let Service = await db.Service.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Service){

        let error = new Error("Service not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Service.live = false;
    let result = await Service.save()

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}