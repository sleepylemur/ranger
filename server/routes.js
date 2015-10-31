"use strict";
var Promise = require('bluebird');
var pgp = require('pg-promise')({promiseLib: Promise});
var db = pgp("postgres://localhost:5432/ranger");


module.exports = function(app) {
  app.post("/histories", function(req,res) {
    var keys = Object.keys(req.body);
    db.none("insert into hand_histories ("+keys.join(",")+") VALUES ("+keys.map(key => "'"+req.body[key]+"'").join(",")+")").then(function() {
      res.json(JSON.stringify(''));
    });
  });

  app.get("/histories/columns", function(req,res) {
    db.any("select column_name, data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'hand_histories'").then(data => {
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

    db.manyOrNone("SELECT * FROM hand_histories"+where).then(data => {
      res.json(data);
    });
  });

  app.delete("/history/:id", function(req,res) {
    db.none("DELETE FROM hand_histories WHERE id = $1",req.params.id).then(() => {
      res.json(JSON.stringify({delete: 'successful'}));
    });
  });

  app.get("/history_col", function(req,res) {
    var where = "";
    if (!req.query.col) res.json({error: 'need to pass in "col"'});
    if (req.query.fixedcols) {
      let fixedcols = JSON.parse(req.query.fixedcols);
      if (fixedcols.length > 0) {
        where = " WHERE " + fixedcols.map(keyval => {
          let key = Object.keys(keyval)[0];
          return key+" = '"+keyval[key]+"'";
        }).join(' AND ');
      }
    }
    db.manyOrNone("SELECT DISTINCT $1^ FROM hand_histories"+where, [req.query.col]).then(data => {
      res.json(data.map(row => row[req.query.col]).filter(col => col !== null));
    });
  });
  app.post("/history_col", function(req,res) {
    // var selected = req.body.;
    var keys = req.body.prevcols.map(col => col.key);
    var vals = req.body.prevcols.map(col => col.val);
    keys.push(req.body.newcol.key);
    vals.push(req.body.newcol.val);
    db.none("insert into hand_histories ("+keys.join(",")+") VALUES ("+vals.map(val => "'"+val+"'").join(',')+")").then(() => {
      res.json(JSON.stringify(''));
    });
  });

  app.get("/test", function(req,res) {
    res.json({test: 'works'});
  });
};
