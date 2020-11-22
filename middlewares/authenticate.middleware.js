const { Errors, VerifyToken } = require('../functions');

module.exports = (req, res, next) => {

    // If Token does not exist
    if(!req.headers['authorization']) return Errors(res, { message: "", status: 401 });

    try {

        let bearer = req.headers['authorization'];
        let token = (bearer.split(' '))[1];
        let response = VerifyToken(token);
        next();

    } catch(Excp) {

        // If Token not valid
        return Errors(res, { message: "", status: 401 });

    }
    
}