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
            as: 'Tooths', 
            model: db.OrderTooth, 
            attributes: ['id','toothId'], 
            paranoid: false, 
            required: false,
            include: [
                {
                    as: 'ToothServices', 
                    model: db.OrderToothService, 
                    attributes: ['id','serviceId'], 
                    paranoid: false, 
                    required: false,
                },
                {
                    as: 'ToothPonticDesign', 
                    model: db.OrderToothPonticDesign, 
                    attributes: ['id','ponticDesignId'], 
                    paranoid: false, 
                    required: false,
                },
            ] 
        },
    ]

    let Order = await db.Order.findOne({
        attributes: { exclude: ['password'] },
        where,
        include
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

        // let result = await Model.create(_OBJECT);

        // delete result.dataValues.password;
        // delete result.dataValues.createdBy;
        // delete result.dataValues.updatedBy;
        // delete result.dataValues.updatedAt;
        // delete result.dataValues.live;

        // let result = Order;

        delete _OBJECT.updatedBy;
        return {
            DB_value: _OBJECT
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