//server using express
const express        = require('express');
const app            = express();

const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const port = 8000;

var Food = require('./api/models/foodModel'),
  User = require('./api/models/userModel')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/antar-makanan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var food_routes = require('./api/routes/foodRoutes'); //importing route
var auth_routes = require('./api/routes/userRoutes');
food_routes(app);
auth_routes(app);
app.listen(port, () => {
  console.log('We are live on ' + port);
});


