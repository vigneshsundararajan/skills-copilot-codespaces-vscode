// Create web server
var express = require("express");
var router = express.Router();

// Require comment model in our routes module
var Comment = require("../models/comment");

// Defined store route
router.route("/add/post/:id").post(function(req, res) {
  var comment = new Comment(req.body);
  comment.post = req.params.id;
  comment
    .save()
    .then(comment => {
      res.status(200).json({ comment: "comment in added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.route("/").get(function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// Defined edit route
router.route("/edit/:id").get(function(req, res) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    res.json(comment);
  });
});

//  Defined update route
router.route("/update/:id").post(function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (!comment) return next(new Error("Could not load Document"));
    else {
      // do your updates here
      comment.comment_name = req.body.comment_name;
      comment.comment_description = req.body.comment_description;

      comment
        .save()
        .then(comment => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
router.route("/delete/:id").get(function(req, res) {
  Comment.findByIdAndRemove({ _id: req.params.id }, function(err, comment) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = router;