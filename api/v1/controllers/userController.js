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
  confirmation_url = '/api/v1/auth/confirmation?token=',
  reset_url = '/api/v1/auth/reset_password?token='

exports.register = function(req, res){
  var newUser = new User(req.body),
    base = 'http://'+req.headers.host

  newUser.hash_password = bcrypt.hashSync(req.body.password);

  newUser.save(function(err, user){
    if(err)
      res.send(err)

    var token = new Token({user_id: user._id, token: crypto.randomBytes(64).toString('hex')})
    token.save(function(error){
      if(error)
        res.status(500).send({msg: error.messages})
    })

    var replacements = {
      name: user.full_name,
      link: base+confirmation_url+token.token
    }

    var mail_options = {
      to: user.email,
      template: 'api/v1/templates/email/register.html',
      subject: 'Verification Account',
    }

    module.exports.sendEmail(req, res, replacements, mail_options);
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

exports.loginRequired = function(req, res, next){
  if(req.user){
    next();
  }else{
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}

exports.sendEmail = function(req, res, replacements, mail_options){
  console.log(mail_options);
  emailTemplate(mail_options['template'], function(err, html){
    var template =  handlebars.compile(html);
    var htmlToSend = template(replacements);

    mail_options.html = htmlToSend

    email.sendMail(mail_options, function(err, response){
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

exports.resendVerification = function(req, res){
  var base = 'http://'+req.headers.host

  User.findOne({email: req.body.email}, function(err, user){
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });

    if((user.is_active == 1 || 2)) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    var token = new Token({user_id: user.id, token: crypto.randomBytes(64).toString('hex')})

    token.save(function(err){
      if (err) { return res.status(500).send({ msg: err.message }); } 
    })

    var replacements = {
      name: user.full_name,
      link: base+confirmation_url+token.token
    }

    var mail_options = {
      to: user.email,
      template: 'api/v1/templates/email/register.html',
      subject: 'Verification Account',
    }

    module.exports.sendEmail(req, res, replacements, mail_options);
    return res.json({message: 'Resend verification success, please check '+user.email+' for verify your account.'});
  })
}

exports.changePassword = function(req, res){
  console.log(req.user._id)
  if(req.user){
    User.findOne({_id: req.user._id},
    function(err, user){
      if(err) return res.status(400).send({msg: 'We were unable to find a user'})

      user.hash_password = bcrypt.hashSync(req.body.new_password);
      user.save(function(err){
        if(err) return res.status(500).send({msg: err.message})

        res.json({message: 'Change password successfully'})
      })
    });
  }else{
    return res.status(402).send({msg: 'Please sign in with your email and password'})
  }
}

exports.resetPassword = function(req, res){
  var base = 'http://'+req.headers.host
  User.findOne({email: req.body.email}, function(err, user){
    if(!user) res.status(400).send({msg: 'We were unable to find a user with '+req.body.email})

    var token = new Token({user_id: user._id, token: crypto.randomBytes(64).toString('hex')})

    token.save(function(err){
      if(err) res.status(500).send({msg: err.message});

      res.status(200).send({msg: 'Please check '+req.body.email +' for reset your password'})
    })

    var replacements = {
      name: user.full_name,
      link: base+reset_url+token.token
    }

    var mail_options = {
      to: user.email,
      template: 'api/v1/templates/email/reset_password.html',
      subject: 'Reset Password',
    }

    module.exports.sendEmail(req, res, replacements, mail_options)
  })
}

exports.actionResetPassword = function(req, res){
  Token.findOne({token: req.query.token}, function(err, token){
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

    User.findOne({_id: token.user_id}, function(err, user){
      if(!user) res.status(400).send({msg: 'We were unable to find user with this token.'})

      user.hash_password = bcrypt.hashSync(req.body.new_password);
      user.save(function(err){
        if(err) return res.status(500).send({msg: err.message})

        res.json({message: 'Reset assword successfully, you can sign in with new password.'})
      })
    })
  })
}
