module.exports = function(res, error){
        return res.status(400).json({ 
            status: 400, 
            message: error, 
            error: "Bad Request"
        });
}