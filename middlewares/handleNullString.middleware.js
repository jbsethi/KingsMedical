module.exports = (req, res, next) => {

    let body = req.body;

    for(let [key, value] of Object.entries(body)){
        if(value === 'null'){
            req.body[key] = null;
        }
    }

    next();
    
}