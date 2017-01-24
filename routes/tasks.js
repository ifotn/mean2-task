var express = require('express');
var router = express.Router();
var mongoJs = require('mongojs');
var db = mongoJs('mongodb://gcrfreeman:dbpass1244@ds048368.mlab.com:48368/gcrfreeman-comp2068', ['tasks']);

// get all
router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

// get single
router.get('/tasks/:id', function(req, res, next) {
  db.tasks.findOne({ _id: mongoJs.ObjectId(req.params.id) }, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

// post
router.post('/tasks', function(req, res, next) {
    var task = req.body;

    if ((!task.title) || (!task.isDone)) {
      res.status(400);
      res.json({ error: 'Bad Data'});
    }
    else {
      db.tasks.save(task, function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      });
    }
});

// delete
router.delete('/tasks/:id', function(req, res, next) {
  db.tasks.remove({ _id: mongoJs.ObjectId(req.params.id) }, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});


// update
router.put('/tasks/:id', function(req, res, next) {
    var task = req.body;
    var updTask = [];

    if (task.isDone) {
      updTask.isDone = task.isDone;
    }

    if (task.title) {
      updTask.title = task.title;
    }

    if (!updTask) {
      res.status(400);
      res.json({ error: 'Bad Data'});
    }
    else {
      db.tasks.update({ _id: mongoJs.ObjectId(req.params.id) }, updTask, {}, function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      });
    }
});

module.exports = router;
