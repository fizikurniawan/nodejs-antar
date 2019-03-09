'use strict';

var mongoose = require('mongoose'),
  Category = mongoose.model('Categories');

exports.list_all_categories = function(req, res){
  Category.find({}, function(err, category){
    if(err) res.status(500).send({msg: err.message});

    res.json(category);
  });
};

exports.detail_category = function(req, res){
  Category.findOne({_id: req.params.categoryId}, function(err, category){
    if(err) res.status(500).send({msg: err.message});

    res.json(category)
  });
};

exports.create_category = function(req, res){
  var new_category = new Category(req.body);

  new_category.save(function(err, category){
    if(err) res.status(500).send({msg: err.message});

    res.json(category);
  });
};

exports.update_category = function(req, res){
  Category.findOneAndUpdate({_id:req.params.categoryId},
    req.body,
    {new: true},
    function(err, category){
      if(err) res.status(500).send({msg:err.message})

      res.json(category)
    }
  );
};

exports.delete_category = function(req, res){
  Category.remove({_id: req.params.categoryId}, function(err){
    if(err) res.status(500).send({msg: err.message});

    res.json({msg: 'Category successfully deleted'});
  });
}
