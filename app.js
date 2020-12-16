const express = require('express');
const cors = require('cors');
const path = require('path');
const multer  = require('multer');
const fs = require('fs');
const { CreateDirectoryIfNotExist, Errors } = require('./functions');
const { HandleNullString } = require('./middlewares/index');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env'});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
        let slashes = (process.env.APP_SERVER.toLowerCase() == 'window') ? '\\' : '/';
        // let slashes = path.sep;

        let date = new Date();
        let dir = __dirname + slashes + "public" + slashes;

        dir = dir + file.mimetype.split('/')[0] + 's' + slashes;
        dir = dir + date.getFullYear() + slashes;
        dir = dir + (date.getMonth() + 1) + slashes;

        let dirIf = CreateDirectoryIfNotExist(dir);

        file.newFile = `${file.mimetype.split('/')[0]}s${slashes}${date.getFullYear()}${slashes}${(date.getMonth() + 1)}${slashes}`;
        file.newFileType = `${file.mimetype.split('/')[0]}`;
        // console.log(file.newFileDir);
        cb(null, dir);
      
    },
    filename: (req, file, cb) => {

        let nameArray = file.originalname.split('.');
        let date = new Date();
        let newFileName = date.getTime() + '.' + nameArray[nameArray.length - 1];

        file.newFile = file.newFile + newFileName;
        cb(null, newFileName);

    }
});

global.upload = multer ({ storage: storage });

// Initializing Middlewares
app.use(cors());
app.use(express.json());

// Middleware for adding delaying
// app.use(function(req,res,next){setTimeout(next,3000)});

app.use('/public', express.static( path.join( __dirname, './public') ));
app.use('/', express.static( path.join( __dirname, './frontend') ));
// app.use('/', express.static( path.join( __dirname, './webapp') ));
app.use(HandleNullString);
// console.log(__dirname);

const routes = require('./routes');

// IMPORTING DATABASE
const DB = require('./models/index');

// REGISTERING ROUTES
app.use('/api', routes);

// HANDLING WILD CARD ROUTE
app.get('*', (req, res) => {

    if(!req.xhr && req.headers['postman-token'] == undefined) return res.sendFile( path.join( __dirname, './frontend/index.html') );
    new Errors(res, { status: 404, error: 'Not Found', message: ''});

});

// STARTING SERVER
app.listen(process.env.APP_PORT, ()=> {
    console.log(`App is listning on Port: ${process.env.APP_PORT}`)
});