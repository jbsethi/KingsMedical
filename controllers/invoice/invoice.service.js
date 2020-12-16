var db = require('../../models');
const { Pagination } = require('../../functions');


exports.GetAll = async function ( _PAGE, _LIMIT, _VERIFICATION ) {

    let association = {
        where: {
            live: true
        }
    }

    if(_VERIFICATION.roleId == 4){
        association.where['labId'] = _VERIFICATION.labId
    }

    let result = await Pagination(_PAGE, _LIMIT, db.Invoice, association);

    return {
        DB_value: result
    };

}

exports.GetAllByOrder = async function ( _ID, _VERIFICATION ) {
    
    let Order = await db.Order.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });

    // returning 404 If Order not exist OR if role == Lab & ORDER.LAB is not equal to current lab user
    if(!Order || (_VERIFICATION.roleId == 4 && Order.dataValues.labId != _VERIFICATION.labId)){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Invoices = await db.Invoice.findAll({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            live: true,
            orderId: _ID
        },
        order: [
            ['id', 'DESC']
        ]
    });

    return {
        DB_value: Invoices
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

exports.Get = async function ( _ID, verification ) {

    let where = {
        id: _ID,
        live: true
    }

    if(verification.roleId == 4){
        where['labId'] = verification.labId
    }

    let Invoice = await db.Invoice.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where
    });


    if(!Invoice){

        let error = new Error("Invoice not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    return {
        DB_value: Invoice
    };

}

exports.Create = async (_OBJECT, verification) => {

    let Order = await db.Order.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _OBJECT.orderId,
            live: true
        }
    });

    // returning 404 If Order not exist OR if role == Lab & ORDER.LAB is not equal to current lab user
    if(!Order || (verification.roleId == 4 && Order.dataValues.labId != verification.labId)){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    _OBJECT['labId'] = Order.dataValues.labId;

    let result = await db.Invoice.create(_OBJECT);

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };
    
    
}

exports.Update = async (_OBJECT, _ID, verification) => {

    let Invoice = await db.Invoice.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Invoice){

        let error = new Error("Invoice not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    let Order = await db.Order.findOne({
        attributes: { exclude: ['createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: {
            id: _OBJECT.orderId,
            live: true
        }
    });

    // returning 404 If Order not exist OR if role == Lab & ORDER.LAB is not equal to current lab user
    if(!Order || (verification.roleId == 4 && Order.dataValues.labId != verification.labId)){

        let error = new Error("Order not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Invoice.attachment = _OBJECT.attachment;
    Invoice.description = _OBJECT.description;
    Invoice.updatedBy = _OBJECT.updatedBy;

    let result = await Invoice.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };


}

exports.Delete = async ( _ID, _VERIFICATION ) => {

    let Invoice = await db.Invoice.findOne({
        where: {
            id: _ID,
            live: true
        }
    });


    if(!Invoice || (_VERIFICATION.roleId == 4 && Invoice.dataValues.labId != _VERIFICATION.labId )){

        let error = new Error("Invoice not found!");
        error.status = 404;
        return {
            DB_error: error
        };

    }

    Invoice.live = false;
    let result = await Invoice.save();

    delete result.dataValues.createdBy;
    delete result.dataValues.updatedBy;
    delete result.dataValues.updatedAt;
    delete result.dataValues.live;

    return {
        DB_value: result
    };

}