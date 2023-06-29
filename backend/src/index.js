// este codigo es para  backend
const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
// import routes
const verifyToken = require('./routes/validate-token');
const solicitudRouter = require('./routes/solicitud');



const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: "Node MongoDB API",
            version: "1.0.0"
        },
        servers:[
            {
                url: 'http://localhost:3001/'
            }
        ]
    },
    apis:[`${path.join(__dirname,"./routes/task.routes.js")}`]
}

const { Mongoose } = require('./database')
//setting
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors());


//SWAGGER API
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


//Routes
app.use('/api' ,verifyToken ,require('./routes/task.routes'));
app.use('/user',require('./routes/auth'));
app.use('/api/solicitud',verifyToken, solicitudRouter);


//static files 
app.use(express.static(path.join('.', 'public')));


//USER


//starting the server
app.listen(app.get('port'), () => {
    console.log(`server in port ${app.get('port')}`);
});