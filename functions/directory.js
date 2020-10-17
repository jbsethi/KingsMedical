const fs = require('fs');

module.exports = {
    CreateDirectoryIfNotExist: function( dir ) {

        // let chkDir = __dirname + '\\..' + dir;
        // console.log(dir);

        if (!fs.existsSync( dir )){
            // console.log('Directory not exist', __dirname + dir);

            fs.mkdirSync(  dir , { recursive: true }, (error) => {
                if( error ){
                    console.log('Dir Error', error);
                    return error;
                }
                else {
                    console.log('Dir Created');
                    return true;
                }
            });
            
        }
        else {
            
            
            // console.log('Directory exist', __dirname + dir);
            return true;

        }

        // console.log('Function Ends');
    
    }
}
