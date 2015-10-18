"use strict";
var Promise = require('bluebird');
var pgp = require('pg-promise')({promiseLib: Promise});
var db = pgp("postgres://localhost:5432/ranger");

rangercolumns = [
  hero_action,
  hero_position,
  hero_spr,
  villain_actions,
  villain_positions,
  villain_sprs,
  num_villains,
  flop_texture,
  flop,
  flop_range,
  turn_texture,
  turn,
  turn_range,
  river_texture,
  river,
  river_range
];

db.none("DROP TABLE IF EXISTS ranger").then(function() {
  return db.none("CREATE TABLE ranger (id SERIAL PRIMARY KEY, "+
    rangercolumns.map(function(col) {return col+" TEXT";}).join(", ")+
    ")";
});
