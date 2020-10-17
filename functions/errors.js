module.exports = function(res, error){

    if(error.status == 400){

        return res.status(error.status).json({ 
            status: error.status, 
            message: error.message, 
            error: "Bad Request"
        });

    }
    else if( error.status == 401 ){

        return res.status(error.status).json({ 
            status: error.status, 
            message: error.message, 
            error: "Unauthorize"
        });

    }
    else if( error.status == 404 ){
        
        return res.status(error.status).json({ 
            status: error.status, 
            message: error.message, 
            error: "Not Found"
        });

    }
    else if( error.status == 409 ){

        return res.status(error.status).json({ 
            status: error.status, 
            message: error.message, 
            error: "Conflict"
        });

    }
    
}