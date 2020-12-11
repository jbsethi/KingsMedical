const Joi = require('@hapi/joi');
const AuthenticationService = require('./authentication.service');
const { Errors, VerifyHash, GenerateToken } = require('../../functions');

const Schema = Joi.object({
    username: Joi.string(),
    password: Joi.string().required()
});

exports.Login = async (req, res, next) => {

        let {error, value} = Schema.validate(req.body);

        if(error){

            let newError = {
                message: error.details[0].message,
                status: 400
            }

            return Errors(res, newError);

        }

        let { DB_error, DB_value } = await AuthenticationService.Login(value);

        if(DB_error){

            return Errors(res, DB_error);

        }
        
        let verifyPassword = await VerifyHash( value.password, DB_value.password);

        if( !verifyPassword ) {

            let newError = {
                message: "Invalid username or password",
                status: 401
            }

            return Errors(res, newError);

        }

        let token = GenerateToken(DB_value);

        return res.status(200).send(token);

}