var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Lab, association);

    return {
        DB_value: result
    };

}

exports.GetEachAndEvery = async function () {
    
    let Lab = await db.Lab.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Lab
    };
}

exports.GetAllActive = async function () {
    
    let Lab = await db.Lab.findAll({
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
        DB_value: Lab
    };
}

exports.Get = async function ( _ID ) {

    let Lab = await db.Lab.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Lab){

        let error = new Error("Lab not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Lab
    };

}

exports.Create = async (_OBJECT) => {

    let result = await db.Lab.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Lab = await db.Lab.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Lab){

        let error = new Error("Lab not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    if(_OBJECT.image != 'null' && _OBJECT.image != null && _OBJECT.image != ''){
        Lab.image = _OBJECT.image;
    }

    Lab.name = _OBJECT.name;
    Lab.description = _OBJECT.description;
    Lab.active = _OBJECT.active;
    Lab.updatedBy = _OBJECT.updatedBy;

    let result = await Lab.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID ) => {

    let Lab = await db.Lab.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Lab){

        let error = new Error("Lab not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Lab.live = false;
    let result = await Lab.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}


/*
**
**  Labs Services
**
*/

exports.GetAllActiveLabServices = async function ( _ID ) {
    
    let LabService = await db.LabService.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true,
            labId: _ID,
            active: true
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: LabService
    };
}
exports.GetEachAndEveryLabServices = async function ( _ID ) {
    
    let LabService = await db.LabService.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true,
            labId: _ID
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: LabService
    };
}
exports.GetAllLabServices = async function ( _ID, _PAGE, _LIMIT) {

    let association = {
        where: {
            live: true,
            labId: _ID
        }
    }

    let result = await Pagination(_PAGE, _LIMIT, db.LabService, association);

    return {
        DB_value: result
    };

}
exports.CreateLabServices = async (_OBJECT) => {

    let Lab = await db.Lab.findOne({
        where: {
            id: _OBJECT.labId,
            live: true
        }
    });
    if(!Lab){

        let error = new Error(`Lab not found having id '${_OBJECT.labId}'`);
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Service = await db.Service.findOne({
        where: {
            id: _OBJECT.serviceId,
            live: true
        }
    });
    if(!Service){

        let error = new Error(`Service not found having id '${_OBJECT.serviceId}'`);
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let result = await db.LabService.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
}
exports.GetLabService = async function ( _ID ) {

    let LabService = await db.LabService.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!LabService){

        let error = new Error(`Lab Service not found having id ${_ID}`);
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: LabService
    };

}
exports.DeleteLabService = async ( _ID ) => {

    let LabService = await db.LabService.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!LabService){

        let error = new Error("Lab Service not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    LabService.live = false;
    let result = await LabService.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}
exports.UpdateLabService = async (_OBJECT, _ID) => {

    let LabService = await db.LabService.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!LabService){

        let error = new Error("Lab Service not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Lab = await db.Lab.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _OBJECT.labId,
            live: true
        }
    });


    if(!Lab){

        let error = new Error(`Lab not found having id ${_OBJECT.labId}`);
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Service = await db.Service.findOne({
        where: {
            id: _OBJECT.serviceId,
            live: true
        }
    });
    if(!Service){

        let error = new Error(`Service not found having id '${_OBJECT.serviceId}'`);
        error.status = 404;
        return {
            DB_error: error
        };

    }

    LabService.labId = _OBJECT.labId;
    LabService.serviceId = _OBJECT.serviceId;
    LabService.active = _OBJECT.active;
    LabService.price = _OBJECT.price;

    let result = await LabService.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}