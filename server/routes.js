"use strict";
var Promise = require('bluebird');
var pgp = require('pg-promise')({promiseLib: Promise});
var db = pgp("postgres://localhost:5432/ranger");


module.exports = function(app) {
  app.post("/histories", function(req,res) {
    var keys = Object.keys(req.body);
    db.none("insert into hand_histories ("+keys.join(",")+") VALUES ("+keys.map(function(key) {return "'"+req.body[key]+"'";}).join(",")+")").then(function() {
      res.json(JSON.stringify(''));
    });
  });

  app.get("/histories/columns", function(req,res) {
    db.any("select column_name, data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'hand_histories'").then(function(data) {
      res.json(data);
    });
  });

  app.get("/histories", function(req,res) {
    var where = "";
    if (Object.keys(req.query).length > 0) {
      where = " WHERE " + Object.keys(req.query)
        .map(key => key+" LIKE '%"+req.query[key]+"%'")
        .join(" AND ");
    }

    db.many("SELECT * FROM hand_histories"+where).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/history/:id", function(req,res) {
    db.none("DELETE FROM hand_histories WHERE id = $1",req.params.id).then(function() {
      res.json(JSON.stringify({delete: 'successful'}));
    });
  });

  app.get("/test", function(req,res) {
    res.json({test: 'works'});
  });
};
