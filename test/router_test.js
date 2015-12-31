var test  = require("tape");
var jsdom = require("jsdom").jsdom;

// faking it
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window   = document.defaultView;

var router = require("../lib/router");

test("micro router", function(t) {
  console.log(document.location);
  t.plan(1);
  t.ok(router);
});
