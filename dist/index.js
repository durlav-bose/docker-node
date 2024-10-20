"use strict";

var express = require('express');
var app = express();
var request = require('request');
var wikip = require('wiki-infobox-parser');

//ejs
app.set("view engine", 'ejs');

//routes
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/index', function (req, response) {
  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "opensearch",
    search: req.query.person,
    limit: "1",
    namespace: "0",
    format: "json"
  };
  url = url + "?";
  Object.keys(params).forEach(function (key) {
    url += '&' + key + '=' + params[key];
  });

  //get wikip search string
  request(url, function (err, res, body) {
    if (err) {
      response.redirect('404');
    }
    result = JSON.parse(body);
    x = result[3][0];
    x = x.substring(30, x.length);
    //get wikip json
    wikip(x, function (err, _final) {
      if (err) {
        response.redirect('404');
      } else {
        var answers = _final;
        response.send(answers);
      }
    });
  });
});

//port
app.listen(3000, console.log("Listening at port 3000..."));