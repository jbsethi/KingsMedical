var db = require('../../models');
const { Pagination } = require('../../functions');

exports.getAllUsers = async function ( _PAGE, _LIMIT) {
    
    let where = {
        live: true
    }

    let association = {
        include: [{
            as: 'Patient',
            model: db.Patient, // will create a left join
            attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        }],
        where
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Order, association);

    return {
        DB_value: result
    };
}

exports.Get = async function ( _ID ) {

    let where = {
        live: true,
        id: _ID,
    }

    let include = [
        {
            as: 'Patient',
            model: db.Patient, // will create a left join
            attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        },
        { 
            as: 'tooths', 
            model: db.OrderTooth, 
            attributes: ['toothId'], 
            paranoid: false, 
            required: false,
            where: { live: true },
            include: [
                {
                    as: 'ToothServices', 
                    model: db.OrderToothService, 
                    attributes: ['serviceId'], 
                    paranoid: false, 
                    required: false,
                },
                {
                    as: 'ToothPonticDesign', 
                    model: db.OrderToothPonticDesign, 
                    attributes: ['ponticDesignId'], 
                    paranoid: false, 
                    required: false,
                },
            ] 
        },
    ]

    let Order = await db.Order.findOne({
        attributes: { exclude: ['password'] },
        where,
        include,
    });


    if(!Order){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Order = Order.get({ plain: true });
    // console.log(Order);

    // Setting order structure
    for( let i = 0; i < Order['tooths'].length; i++ ){

        let tooth = Order['tooths'][i];

        let ToothService = tooth['ToothServices'];
        let serviceIds = [];

        for( let service of ToothService ){
            serviceIds.push(service['serviceId']);
        }
        Order['tooths'][i]['serviceIds'] = serviceIds;
        delete Order['tooths'][i]['ToothServices'];

        let ToothPonticDesign = tooth['ToothPonticDesign'];
        let ponticDesignIds = [];
        for( let ponticDesign of ToothPonticDesign ){
            ponticDesignIds.push(ponticDesign['ponticDesignId']);
        }
        Order['tooths'][i]['ponticDesignIds'] = ponticDesignIds;
        delete Order['tooths'][i]['ToothPonticDesign'];

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
    
                let error = new Error(`Lab does not exists having id '${_OBJECT.labId}'`);
                error.status = 400;
                return {
                    DB_error: error
                }; 
    
            }

        }

        if( _OBJECT.shadeId ){

            let Shade = await db.Shade.findOne({
                where: {
                    id: _OBJECT.shadeId,
                    live: true
                }
            });
    
            if(!Shade){
    
                let error = new Error(`Shade does not exists having id '${_OBJECT.shadeId}'`);
                error.status = 400;
                return {
                    DB_error: error
                }; 
    
            }

        }

        if( _OBJECT.parentId ){

            let parent = await db.Order.findOne({
                where: {
                    id: _OBJECT.parentId,
                    live: true
                }
            });
    
            if(!parent){
    
                let error = new Error(`Order does not exists having id '${_OBJECT.parentId}'`);
                error.status = 400;
                return {
                    DB_error: error
                }; 
    
            }

        }

        let tooths = _OBJECT.tooths;

        for(let element of tooths){

            let Tooth = await db.Tooth.findOne( {where: {id: element.toothId, live: true } });
            if(!Tooth){
                let error = new Error(`Tooth does not exists having id '${element.toothId}'`);
                error.status = 400;
                return {
                    DB_error: error
                };
            }

            let services = element.serviceIds;
            for(let serviceId of services){

                let Service = await db.Service.findOne( {where: {id: serviceId, live: true } });
                if(!Service){
                    let error = new Error(`Service does not exists having id '${serviceId}'`);
                    error.status = 400;
                    return {
                        DB_error: error
                    };
                }

            }

            let ponticDesigns = element.ponticDesignIds;
            for(let ponticDesignId of ponticDesigns){

                let PonticDesign = await db.PonticDesign.findOne( {where: {id: ponticDesignId, live: true } });
                if(!PonticDesign){
                    let error = new Error(`Pontic Design does not exists having id '${ponticDesignId}'`);
                    error.status = 400;
                    return {
                        DB_error: error
                    };
                }

            }

        }
        
        /*
        **After validating success
        */

        // Create Patient Object
        let patientOject = {
            name: _OBJECT.patientName,
            gender: _OBJECT.patientGender,
            contact: _OBJECT.patientContact,
            createdBy: _OBJECT.createdBy,
        }
        let Patient = await db.Patient.create(patientOject);
        if(!Patient){
            let error = new Error(`Failed to add patient`);
            error.status = 500;
            return {
                DB_error: error
            };
        }

        // Creating Order
        let orderObject = {
            patientEmiratesId: _OBJECT.patientEmiratesId,
            patientId: Patient.dataValues.id,
            sentDate: _OBJECT.sendDate,
            returnDate: _OBJECT.returnDate,
            urgent: _OBJECT.urgent,
            notes: _OBJECT.notes,
            labId: _OBJECT.labId,
            shadeId: _OBJECT.shadeId,
            parentId: _OBJECT.parentId,
            status: 'placed',
            createdBy: _OBJECT.createdBy,
        }
        let Order = await db.Order.create(orderObject);

        // Adding Tooths to Orders
        for(let element of tooths){

            let orderTooth = {
                orderId: Order.dataValues.id,
                toothId: element.toothId,
                createdBy: _OBJECT.createdBy,
            }
            let Tooth = await db.OrderTooth.create(orderTooth);
            if(!Tooth){
                let error = new Error(`Failed to add tooth having id '${element.toothId}' to order`);
                error.status = 500;
                return {
                    DB_error: error
                };
            }

            let services = element.serviceIds;
            for(let serviceId of services){

                let orderToothService = {
                    orderToothId: Tooth.dataValues.id,
                    serviceId: serviceId,
                    createdBy: _OBJECT.createdBy,
                }
                let Service = await db.OrderToothService.create(orderToothService);
                if(!Service){
                    let error = new Error(`Failed to add service having id '${serviceId}' to order`);
                    error.status = 500;
                    return {
                        DB_error: error
                    };
                }

            }

            let ponticDesigns = element.ponticDesignIds;
            for(let ponticDesignId of ponticDesigns){

                let orderToothPonticDesign = {
                    orderToothId: Tooth.dataValues.id,
                    ponticDesignId: ponticDesignId,
                    createdBy: _OBJECT.createdBy,
                }
                let PonticDesign = await db.OrderToothPonticDesign.create(orderToothPonticDesign);
                if(!PonticDesign){
                    let error = new Error(`Failed to add pontic design having id '${ponticDesignId}' to order`);
                    error.status = 500;
                    return {
                        DB_error: error
                    };
                }

            }

        }

        // delete result.dataValues.password;
        // delete result.dataValues.createdBy;
        // delete result.dataValues.updatedBy;
        // delete result.dataValues.updatedAt;
        // delete result.dataValues.live;

        delete _OBJECT.updatedBy;

        return {
            DB_value: _OBJECT
        };
    
    
}

exports.Update = async (_OBJECT, _ID) => {

    let Order = null;
    if( _ID ){

        Order = await db.Order.findOne({
            where: {
                id: _ID,
                live: true
            }
        });

        if(!Order){

            let error = new Error(`Order does not exists having id '${_ID}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    let Patient = null;
    if( _OBJECT.patientId ){

        Patient = await db.Patient.findOne({
            where: {
                id: _OBJECT.patientId,
                live: true
            }
        });

        if(!Patient){

            let error = new Error(`Patient does not exists having id '${_OBJECT.patientId}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    if( _OBJECT.labId ){

        let lab = await db.Lab.findOne({
            where: {
                id: _OBJECT.labId,
                live: true
            }
        });

        if(!lab){

            let error = new Error(`Lab does not exists having id '${_OBJECT.labId}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    if( _OBJECT.shadeId ){

        let Shade = await db.Shade.findOne({
            where: {
                id: _OBJECT.shadeId,
                live: true
            }
        });

        if(!Shade){

            let error = new Error(`Shade does not exists having id '${_OBJECT.shadeId}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    if( _OBJECT.parentId ){

        let parent = await db.Order.findOne({
            where: {
                id: _OBJECT.parentId,
                live: true
            }
        });

        if(!parent){

            let error = new Error(`Order does not exists having id '${_OBJECT.parentId}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    let tooths = _OBJECT.tooths;

    for(let element of tooths){

        let Tooth = await db.Tooth.findOne( {where: {id: element.toothId, live: true } });
        if(!Tooth){
            let error = new Error(`Tooth does not exists having id '${element.toothId}'`);
            error.status = 400;
            return {
                DB_error: error
            };
        }

        let services = element.serviceIds;
        for(let serviceId of services){

            let Service = await db.Service.findOne( {where: {id: serviceId, live: true } });
            if(!Service){
                let error = new Error(`Service does not exists having id '${serviceId}'`);
                error.status = 400;
                return {
                    DB_error: error
                };
            }

        }

        let ponticDesigns = element.ponticDesignIds;
        for(let ponticDesignId of ponticDesigns){

            let PonticDesign = await db.PonticDesign.findOne( {where: {id: ponticDesignId, live: true } });
            if(!PonticDesign){
                let error = new Error(`Pontic Design does not exists having id '${ponticDesignId}'`);
                error.status = 400;
                return {
                    DB_error: error
                };
            }

        }

    }
    
    /*
    **After validating success
    */

    await db.OrderTooth.update({ live: false }, { where: { orderId: _ID } });

    /*
    **After removing current associations
    */

    // Create Patient Object
    // let patientOject = {
    //     name: _OBJECT.patientName,
    //     gender: _OBJECT.patientGender,
    //     contact: _OBJECT.patientContact,
    //     createdBy: _OBJECT.createdBy,
    // }
    Patient.name = _OBJECT.patientName;
    Patient.gender = _OBJECT.patientGender;
    Patient.contact = _OBJECT.patientContact;
    Patient.updatedBy = _OBJECT.updatedBy;
    await Patient.save();

    // Creating Order
    Order.patientEmiratesId = _OBJECT.patientEmiratesId;
    Order.patientId = _OBJECT.patientId;
    Order.sentDate = _OBJECT.sendDate;
    Order.returnDate = _OBJECT.returnDate;
    Order.urgent = _OBJECT.urgent;
    Order.notes = _OBJECT.notes;
    Order.labId = _OBJECT.labId;
    Order.shadeId = _OBJECT.shadeId;
    Order.parentId = _OBJECT.parentId;
    Order.updatedBy = _OBJECT.updatedBy;

    await Order.save();

    // Adding Tooths to Orders
    for(let element of tooths){

        let orderTooth = {
            orderId: _ID,
            toothId: element.toothId,
            createdBy: _OBJECT.createdBy,
        }
        let Tooth = await db.OrderTooth.create(orderTooth);
        if(!Tooth){
            let error = new Error(`Failed to add tooth having id '${element.toothId}' to order`);
            error.status = 500;
            return {
                DB_error: error
            };
        }

        let services = element.serviceIds;
        for(let serviceId of services){

            let orderToothService = {
                orderToothId: Tooth.dataValues.id,
                serviceId: serviceId,
                createdBy: _OBJECT.createdBy,
            }
            let Service = await db.OrderToothService.create(orderToothService);
            if(!Service){
                let error = new Error(`Failed to add service having id '${serviceId}' to order`);
                error.status = 500;
                return {
                    DB_error: error
                };
            }

        }

        let ponticDesigns = element.ponticDesignIds;
        for(let ponticDesignId of ponticDesigns){

            let orderToothPonticDesign = {
                orderToothId: Tooth.dataValues.id,
                ponticDesignId: ponticDesignId,
                createdBy: _OBJECT.createdBy,
            }
            let PonticDesign = await db.OrderToothPonticDesign.create(orderToothPonticDesign);
            if(!PonticDesign){
                let error = new Error(`Failed to add pontic design having id '${ponticDesignId}' to order`);
                error.status = 500;
                return {
                    DB_error: error
                };
            }

        }

    }

    delete _OBJECT.updatedBy;

    return {
        DB_value: _OBJECT
    };


}

exports.UpdateStatus = async (_OBJECT, _ID) => {

    let Order = null;
    if( _ID ){

        Order = await db.Order.findOne({
            where: {
                id: _ID,
                live: true
            }
        });

        if(!Order){

            let error = new Error(`Order does not exists having id '${_ID}'`);
            error.status = 400;
            return {
                DB_error: error
            }; 

        }

    }

    Order.status = _OBJECT.status;
    Order.updatedBy = _OBJECT.updatedBy;

    await Order.save();

    // Adding Tooths to Orders

    delete _OBJECT.updatedBy;

    return {
        DB_value: _OBJECT
    };


}

exports.Delete = async function ( _OBJECT, _ID ) {

    let where = {
        live: true,
        id: _ID,
    }

    let Order = await db.Order.findOne({
        attributes: { exclude: ['password'] },
        where
    });


    if(!Order ){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Order.live = false;
    Order.updatedBy = _OBJECT.updatedBy;

    let result = await Order.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;
    
    return {
        DB_value: result
    };

}