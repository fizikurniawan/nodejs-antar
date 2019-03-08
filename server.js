//server using express
const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const jwt            = require('jsonwebtoken');
const db             = "antar-makanan";
const port           = 8000;
const errorHandler   = require('./api/v1/config/errorHandler');
const modelV1        = require('./api/v1/models')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/'+db);

//parser body only accept application/json
app.use(bodyParser.json());


//midleware
middleware = require('./api/v1/config/middlewares/loggedUser');
app.use(middleware);

//set router
var apiRouterV1 = require('./api/v1/router');
app.use('/api/v1', apiRouterV1)


app.listen(port, () => {
  errorHandler()
  console.log('We are live on ' + port);
});


