'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  email = require('../config/email'),
  emailTemplate = require('../config/emailTemplate'),
  handlebars = require('handlebars'),
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
  var expired = '1d',
    secret_key = "ANTAR-RESTFULAPIs",
    token_encode = ''

  User.findOne({email: req.body.email
    }, function(err, user){
        if(err) throw err;
        if(user && user.comparePassword(req.body.password)){
          token_encode = jwt.sign(
            {email: user.email, fullName: user.fullName, _id: user._id, is_active: user.is_active},
            secret_key,
            {expiresIn: expired}
          )
          return res.json({token: token_encode});
        }else{
          res.status(401).json({ message: 'Authentication failed. Please Check your email or password!' });
        }
    }
  ).select("+hash_password")
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

exports.send = function(req, res){
  var mailOptions

  emailTemplate('api/v1/templates/email/register.html', function(err, html){
    var template =  handlebars.compile(html);
    var replacements = {
      name: "Fizi",
      link: "http://tux.co.id"
    };
    var htmlToSend = template(replacements);
    mailOptions={
      from: 'TuxLabs Support',
      to : "fizikurniawan@gmail.com",
      subject : "Please confirm your Email account",
      html : htmlToSend
    }

    email.sendMail(mailOptions, function(err, response){
      if(err){
        console.log(err);
        res.send(err)
      }else{
        console.log(response)
        res.json('email sent')
      }
    })
  })
}
