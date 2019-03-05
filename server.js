//server using express
const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const jwt            = require('jsonwebtoken');
const port = 8000;

var Food = require('./api/models/foodModel'),
  User = require('./api/models/userModel')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/antar-makanan');

//parser body only accept application/json
app.use(bodyParser.json());


//midleware
middleware = require('./api/config/middleware');
app.use(middleware);

//set router
var routes = require('./api/routes/index');
routes(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});


