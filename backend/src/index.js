// este codigo es para  backend
const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require("cors");

const { Mongoose } = require('./database')
//setting
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//Routes
app.use('/api' ,require('./routes/task.routes'));
//static files 
app.use(express.static(path.join('.', 'public')));


//starting the server
app.listen(app.get('port'), () => {
    console.log(`server in port ${app.get('port')}`);
});