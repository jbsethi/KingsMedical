const { Errors, DecodeToken } = require('../functions');

module.exports = (req, res, next) => {

    // If Token does not exist
    if(!req.headers['auth-key']) next();

    try {

        req.token = DecodeToken(req.headers['auth-key']);
        next();

    } catch(Excp) {

        // If Token not valid
        return Errors(res, { message: "", status: 401 });

    }
    
}