const Joi = require('@hapi/joi');
const Service = require('./order.service');
const { Errors, GenerateHash } = require('../../functions');

let tooth = Joi.object().keys({
    toothId: Joi.number().required(),
    serviceIds: Joi.array().min(1).items(Joi.number()),
    ponticDesignIds: Joi.array().min(1).items(Joi.number())
});

const Schema = Joi.object({

    patientEmiratesId: Joi.string().required(),
    patientName: Joi.string().required(),
    patientGender: Joi.string().required(),
    patientContact: Joi.string().required().allow(null, ''),

    sendDate: Joi.date().required().iso().allow(null, ''),
    returnDate: Joi.date().required().iso().allow(null, ''),
    notes: Joi.string().required().allow(null, ''),
    urgent: Joi.boolean().required(),
    // urgent: Joi.number().required(),
    labId: Joi.number().required().allow(null, ''),
    parentId: Joi.number().required().allow(null, ''),

    tooths: Joi.array().min(1).items(tooth),

});

exports.GetAll = async (req, res, next) => {
    

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;

    let { DB_error, DB_value } = await Service.getAllUsers(pageNo, pageSize);

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


    let { DB_error, DB_value } = await Service.Get(req.params.id);

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

        // let { DB_error, DB_value } = await Service.Create(value);

        // if(DB_error){

        //     return Errors(res, DB_error);

        // }
        

        // return res.status(201).send(DB_value);
        return res.status(201).send({"success": true});

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

    let { DB_error, DB_value } = await Service.Update( value, req.params.id );

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

    let value = {};
    value.updatedBy = req.token.id;

    let { DB_error, DB_value } = await Service.Delete( value, req.params.id );

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}