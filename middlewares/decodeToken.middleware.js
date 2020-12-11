const { Errors, DecodeToken } = require('../functions');

module.exports = (req, res, next) => {

    // If Token does not exist
    if(!req.headers['authorization']) next();

    try {

        let bearer = req.headers['authorization'];
        let token = (bearer.split(' '))[1];
        req.token = DecodeToken(token);
        next();

    } catch(Excp) {
        
        // If Token not valid
        return Errors(res, { message: "", status: 401 });

    }
    
}