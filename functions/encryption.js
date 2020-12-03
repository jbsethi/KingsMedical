const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    generateHash: async ( string ) => {

        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(string, salt);

    },
    verifyHash: async ( string, hash ) => {

        return bcrypt.compare(string, hash);

    },
    generateToken: ( object ) => {

        let payload = {
            id: object.id,
            name: object.name,
            username: object.username,
            image: object.image,
            role: {
                id: object.Role.dataValues.id,
                name: object.Role.dataValues.title
            }
        };

        let config = {
            subject: object.name,
            issuer: process.env.TOKEN_ISSUER,
            expiresIn: process.env.TOKEN_EXPIRY
        }

        return {
            token: jwt.sign(payload, process.env.TOKEN_KEY, config),
            timestamp: new Date()
        }
    },
    verifyToken: ( hash ) => {

        return jwt.verify(hash, process.env.TOKEN_KEY);
        
    },
    decodeToken: ( token ) => {

        return jwt.decode( token );
        
    }
}