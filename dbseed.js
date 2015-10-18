"use strict";
var Promise = require('bluebird');
var pgp = require('pg-promise')({promiseLib: Promise});
var db = pgp("postgres://localhost:5432/ranger");

var rangercolumns = [
  "hero_action",
  "hero_position",
  "hero_spr",
  "villain_actions",
  "villain_positions",
  "villain_sprs",
  "num_villains",
  "flop_texture",
  "flop",
  "flop_range",
  "turn_texture",
  "turn",
  "turn_range",
  "river_texture",
  "river",
  "river_range"
];

console.log('recreating table');
db.none("DROP TABLE IF EXISTS hand_histories").then(function() {
  return db.none(
    "CREATE TABLE hand_histories (id SERIAL PRIMARY KEY, "+
    rangercolumns.map(function(col) {return col+" TEXT";}).join(", ")+
    ")"
  );
}).then(function() {
  process.exit();
});
