'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  email = require('../config/email'),
  emailTemplate = require('../config/emailTemplate'),
  handlebars = require('handlebars'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto'),
  User = mongoose.model('Users'),
  Token = mongoose.model('Tokens'),
  url = '/api/v1/auth/confirmation?token='

exports.register = function(req, res){
  var newUser = new User(req.body),
    base = 'http://'+req.headers.host

  console.log(base)

  newUser.hash_password = bcrypt.hashSync(req.body.password);

  newUser.save(function(err, user){
    if(err)
      res.send(err)

    var token = new Token({user_id: user._id, token: crypto.randomBytes(64).toString('hex')})
    token.save(function(error){
      if(error)
        console.log(error)
        res.json({message: 'error'})
    })
    module.exports.send(req, res, user, base+url+token.token);
    return res.json({message: 'Register success, please check '+user.email+' for verify your account.'});
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

exports.send = function(req, res, user, url){
  var mailOptions

  emailTemplate('api/v1/templates/email/register.html', function(err, html){
    var template =  handlebars.compile(html);
    var replacements = {
      name: user.fullName,
      link: url
    };
    var htmlToSend = template(replacements);
    mailOptions={
      from: 'TuxLabs Support',
      to : user.email,
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

exports.emailConfirmation = function(req, res, next){
  Token.findOne({token: req.query.token}, function(err, token){
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

    User.findOne({_id: token.user_id}, function(err, user){
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });

      if (user.is_active == 1) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

      user.is_active = 1;
      user.save(function(err){
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send("The account has been verified. Please log in.");
      })
    })
  })
}
