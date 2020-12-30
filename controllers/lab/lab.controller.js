const Joi = require('@hapi/joi');
const LabService = require('./lab.service');
const { Errors } = require('../../functions');

const Schema = Joi.object({
    image: Joi.string().required().allow(null, ''),
    name: Joi.string().required(),
    active: Joi.boolean().required(),
    description: Joi.string().allow('', null)
});

const SchemaLabService = Joi.object({
    labId: Joi.number().required(),
    serviceId: Joi.number().required(),
    price: Joi.number().required(),
    active: Joi.boolean().required(),
});

exports.GetAll = async (req, res, next) => {
    

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;


    let { DB_error, DB_value } = await LabService.GetAll(pageNo, pageSize);

    if(DB_error){

        return Errors(res, DB_error);

    }
    
    return res.send(DB_value);

}

exports.GetEachAndEvery = async (req, res, next) => {


    let { DB_error, DB_value } = await LabService.GetEachAndEvery();

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.GetAllActive = async (req, res, next) => {


    let { DB_error, DB_value } = await LabService.GetAllActive();

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

    let { DB_error, DB_value } = await LabService.Get(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.Create = async (req, res, next) => {
    
    if(req.file){
        req.body['image'] = req.file.newFile;
    }

    let {error, value} = Schema.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    value.createdBy = req.token.id;
    value.updatedBy = null;

    let { DB_error, DB_value } = await LabService.Create(value);

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
        req.body['image'] = req.file.newFile;
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

    let { DB_error, DB_value } = await LabService.Update( value, req.params.id );

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

    let { DB_error, DB_value } = await LabService.Delete(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}


/*
**
**  Labs Services
**
*/

exports.GetAllActiveLabService = async (req, res, next) => {


    if( isNaN(req.params.id) ){
        let error = new Error('Lab id must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await LabService.GetAllActiveLabServices(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.GetEachAndEveryLabService = async (req, res, next) => {


    if( isNaN(req.params.id) ){
        let error = new Error('Lab id must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await LabService.GetEachAndEveryLabServices(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.GetAllLabService = async (req, res, next) => {
    
    if( isNaN(req.params.id) ){
        let error = new Error('Lab id must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;


    let { DB_error, DB_value } = await LabService.GetAllLabServices(req.params.id, pageNo, pageSize);

    if(DB_error){

        return Errors(res, DB_error);

    }
    
    return res.send(DB_value);

}

exports.GetLabService = async (req, res, next) => {
    
    if( isNaN(req.params.id) ){
        let error = new Error('Lab and Service id must be a number');
        error.status = 400;
        return Errors(res, error);
    }


    let { DB_error, DB_value } = await LabService.GetLabService(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.CreateLabServices = async (req, res, next) => {
    
    // if( isNaN(req.params.id) ){
    //     let error = new Error('ID must be a number');
    //     error.status = 400;
    //     return Errors(res, error);
    // }


    let {error, value} = SchemaLabService.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    // value.labId = req.params.id;
    value.createdBy = req.token.id;
    value.updatedBy = null;

    let { DB_error, DB_value } = await LabService.CreateLabServices(value);

    if(DB_error){

        return Errors(res, DB_error);

    }
    

    return res.status(201).send(DB_value);

}

exports.DeleteLabService = async (req, res, next) => {
    
    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }

    let { DB_error, DB_value } = await LabService.DeleteLabService(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.UpdateLabService = async (req, res, next) => {

    if( isNaN(req.params.id) ){
        let error = new Error('ID must be a number');
        error.status = 400;
        return Errors(res, error);
    }
    
    let {error, value} = SchemaLabService.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    value.updatedBy = req.token.id;

    let { DB_error, DB_value } = await LabService.UpdateLabService( value, req.params.id );

    if(DB_error){

        return Errors(res, DB_error);
        
    }

    return res.send(DB_value);

}