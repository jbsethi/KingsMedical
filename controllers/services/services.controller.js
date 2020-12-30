const Joi = require('@hapi/joi');
const ServiceService = require('./services.service');
const { Errors } = require('../../functions');

const Schema = Joi.object({
    name: Joi.string().required(),
    active: Joi.boolean().required(),
    replaceInterval: Joi.number().required(),
    // price: Joi.number().required(),
    serviceType: Joi.number().required(),
    description: Joi.string().allow('', null)
});

exports.GetAll = async (req, res, next) => {
    

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;


    let { DB_error, DB_value } = await ServiceService.GetAll(pageNo, pageSize);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.GetEachAndEvery = async (req, res, next) => {


    let { DB_error, DB_value } = await ServiceService.GetEachAndEvery();

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);
}

exports.GetAllActive = async (req, res, next) => {


    let { DB_error, DB_value } = await ServiceService.GetAllActive();

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

    let { DB_error, DB_value } = await ServiceService.Get(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.Create = async (req, res, next) => {

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
        // _OBJECT.createdBy = 1;
        // _OBJECT.updatedBy = 1;

        let { DB_error, DB_value } = await ServiceService.Create(value);

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

    let {error, value} = Schema.validate(req.body);

    if(error){

        let newError = {
            message: error.details[0].message,
            status: 400
        }

        return Errors(res, newError);

    }

    value.updatedBy = req.token.id;

    let { DB_error, DB_value } = await ServiceService.Update( value, req.params.id );

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

    let { DB_error, DB_value } = await ServiceService.Delete(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}