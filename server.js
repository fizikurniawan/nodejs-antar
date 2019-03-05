//server using express
const express        = require('express');
const app            = express();

const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const port = 8000;
const Food = require('./api/models/foodModel')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/antar-makanan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/foodRoutes'); //importing route
routes(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});


