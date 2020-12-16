const Joi = require('@hapi/joi');
const InvoiceService = require('./invoice.service');
const { Errors } = require('../../functions');

const Schema = Joi.object({
    // orderId: Joi.number().required(),
    attachment: Joi.string().required(),
    description: Joi.string().allow('', null)
});

exports.GetAll = async (req, res, next) => {
    

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;


    let { DB_error, DB_value } = await InvoiceService.GetAll(pageNo, pageSize, {roleId: req.token.role.id, labId: req.token.labId});

    if(DB_error){

        return Errors(res, DB_error);

    }
    
    return res.send(DB_value);

}

exports.GetAllByOrder = async (req, res, next) => {

    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await InvoiceService.GetAllByOrder(req.params.id, {roleId: req.token.role.id, labId: req.token.labId});

    if(DB_error){
        return Errors(res, DB_error);
    }

    return res.send(DB_value);

}

exports.GetAllActive = async (req, res, next) => {


    let { DB_error, DB_value } = await InvoiceService.GetAllActive();

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.Get = async (req, res, next) => {
    
    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await InvoiceService.Get(req.params.id, {roleId: req.token.role.id, labId: req.token.labId});

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.Create = async (req, res, next) => {
    
    if(req.file){
        req.body['attachment'] = req.file.newFile;
    }

    let schema = Schema.keys({
        orderId: Joi.number().required(),
    });

    let {error, value} = schema.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    value.createdBy = req.token.id;
    value.updatedBy = null;

    let { DB_error, DB_value } = await InvoiceService.Create(value, {roleId: req.token.role.id, labId: req.token.labId});

    if(DB_error){

        return Errors(res, DB_error);

    }
    

    return res.status(201).send(DB_value);

}

exports.Update = async (req, res, next) => {

    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    if(req.file){
        req.body['attachment'] = req.file.newFile;
    }
    
    let {error, value} = Schema.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    value.updatedBy = req.token.id;

    let { DB_error, DB_value } = await InvoiceService.Update( value, req.params.id, {roleId: req.token.role.id, labId: req.token.labId} );

    if(DB_error){

        return Errors(res, DB_error);
        
    }

    return res.send(DB_value);

}

exports.Delete = async (req, res, next) => {
    
    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await InvoiceService.Delete(req.params.id, {roleId: req.token.role.id, labId: req.token.labId});

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}