'use strict';

var mongoose = require('mongoose'),
  Order = mongoose.model('Orders');

exports.change_status_order = function(req, res){
  Order.findOneAndUpdate({_id:req.params.orderId},
  {status: req.body.status}, {new:true},
  function(err, order){
    if(err)
      res.send(err)
    res.json(order)
  })
}

exports.list_all_orders = function(req, res){
  Order.find({user_id: req.user._id}, function(err, order){
    if(err)
      res.send(err);
    res.json(order);
  });
}

exports.create_order = function(req, res){
  var new_order = new Order({
    user_id: req.user._id,
    orders: req.body.orders
  });
  new_order.save(function(err, order){
    if(err)
      res.send(err)
    res.json(order)
  });
}

exports.detail_order = function(req, res){
  Order.findById(req.params.orderId, function(err, order){
    if(err)
      res.send(err)
    res.json(order)
  });
}

exports.list_ongoing = function(req, res){
  Order.find({user_id: req.user._id, status: 0},
  function(err, order){
    if(err)
      res.send(err)
    res.json(order)
  })
}

exports.list_success = function(req, res){
  Order.find({user_id: req.user._id, status: 1},
  function(err, order){
    if(err)
      res.send(err)
    res.json(order)
  })
}


