const Joi = require('@hapi/joi');
const UserService = require('./user.service');
const { Errors, GenerateHash } = require('../../functions');

const superman = process.env.SUPERMAN;
const supermanId = process.env.SUPERMAN_ID;

const Schema = Joi.object({
    image: Joi.string().allow(null, ''),
    emiratesId: Joi.string().required(),
    email: Joi.string().email().allow(null, ''),
    name: Joi.string().required(),
    username: Joi.string().required(),
    contact: Joi.string().allow(null, ''),
    role: Joi.number().required(),
    labId: Joi.number().required().allow(null, ''),
    remarks: Joi.string().allow(null, ''),
    active: Joi.boolean().required(),
});

exports.GetAll = async (req, res, next) => {
    

    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;

    let { DB_error, DB_value } = await UserService.getAllUsers(pageNo, pageSize);

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

    if( superman ){
        if( req.params.id == supermanId && req.token.id != supermanId ){
            let error = new Error('User not found!');
            error.status = 404;
            return Errors(res, error);
        }
    }

    let { DB_error, DB_value } = await UserService.Get(req.params.id);

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}

exports.Create = async (req, res, next) => {
        
        if(req.file){
            req.body['image'] = req.file.newFile;
        }

        let schema = Schema.keys({
            password: Joi.string().required(),
            confirm_password: Joi.ref('password'),
            // createdBy: Joi.number().required(),
        });

        let {error, value} = schema.validate(req.body);

        if(error){

            let newError = {
                message: error.details[0].message,
                status: 400
            }

            return Errors(res, newError);

        }

        value.password = await GenerateHash(value.password);
        value.createdBy = req.token.id;
        value.updatedBy = null;

        let { DB_error, DB_value } = await UserService.Create(value);

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

    let { DB_error, DB_value } = await UserService.Update( value, req.params.id );

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

    let { DB_error, DB_value } = await UserService.Delete( value, req.params.id );

    if(DB_error){

        return Errors(res, DB_error);

    }

    return res.send(DB_value);

}