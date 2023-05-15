// este codigo es para  backend
const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const { Mongoose } = require('./database')
//setting
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors());
//Routes
app.use('/api' ,require('./routes/task.routes'));
//static files 
app.use(express.static(path.join('.', 'public')));


//starting the server
app.listen(app.get('port'), () => {
    console.log(`server in port ${app.get('port')}`);
});