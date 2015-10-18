var Promise = require('bluebird');

export function api_delete(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", function() {resolve(JSON.parse(this.responseText));});
    xhr.open("DELETE", url);
    xhr.send(null);
  });
}

export function post(url,data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", function() {resolve(JSON.parse(this.responseText));});
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
  });
}

export function get(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", function() {resolve(JSON.parse(this.responseText));});
    xhr.open("GET", url);
    xhr.send(null);
  });
}
