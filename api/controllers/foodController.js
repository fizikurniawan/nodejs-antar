'use strict';

var mongoose = require('mongoose'),
  Food = mongoose.model('Foods');

exports.list_all_foods = function(req, res){
  Food.find({}, function(err, food){
    if(err)
      res.send(err);
    res.json(food);
  });
}

exports.create_food = function(req, res){
  var new_food = new Food(req.body);
  new_food.save(function(err, food){
    if(err)
      res.send(err)
    res.json(food)
  });
}

exports.detail_food = function(req, res){
  Food.findById(req.params.foodId, function(err, food){
    if(err)
      res.send(err)
    res.json(food)
  });
}

exports.update_food = function(req, res){
  Food.findOneAndUpdate({_id:req.params.foodId},
    req.body, {new:true},
    function(err, food){
      if(err)
        res.send(err)
      res.json(food)
    });
}

exports.delete_food = function(req, res){
  Food.remove({
    _id: req.params.foodId},
    function(err, food){
      if(err)
        res.send(err)
      res.json({ message: 'Food successfully deleted' })
  })
}
