'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt-nodejs'),
  User = mongoose.model('Users');

exports.register = function(req, res){
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password);

  newUser.save(function(err, user){
    if(err)
      res.send(err)
    user.hash_password = undefined;
    return res.json(user);
  })
};

exports.sign_in = function(req, res){
  User.findOne({email: req.body.email
    }, function(err, user){
        if(err) throw err;
        if(user && user.comparePassword(req.body.password)){
          return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
        }else{
          res.status(401).json({ message: 'Authentication failed. Please Check your email or password!' });
        }
    }
  )
};

exports.sign_out = function(req, res){

};

exports.loginRequired = function(req, res, next){
  if(req.user){
    next();
  }else{
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}
