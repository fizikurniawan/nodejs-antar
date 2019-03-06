//server using express
const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const jwt            = require('jsonwebtoken');
const port           = 8000;
const errorHandler   = require('./api/config/errorHandler');

var Food = require('./api/models/foodModel'),
  User = require('./api/models/userModel'),
  Order = require('./api/models/orderModel')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/antar-makanan');

//parser body only accept application/json
app.use(bodyParser.json());


//midleware
middleware = require('./api/config/middlewares/loggedUser');
app.use(middleware);

//set router
var apiRouterV1 = require('./api/router/apiRouterV1');

app.use('/api/v1', apiRouterV1)


app.listen(port, () => {
  errorHandler()
  console.log('We are live on ' + port);
});


