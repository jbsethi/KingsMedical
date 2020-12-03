module.exports = {
    HandleNullString: require('./handleNullString.middleware'),
    Authenticate: require('./authenticate.middleware'),
    AuthenticatePermission: require('./authenticatePermission.middleware'),
    DecodeToken: require('./decodeToken.middleware'),
}