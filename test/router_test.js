var test  = require("tape");
var jsdom = require("jsdom").jsdom;

// faking it
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window   = document.defaultView;

var router = require("../lib/router");

test("micro router", (t)=> {
  window.history.replaceState(null, null, "http://nikolay.rocks/like/totally");

  t.test("Basic matching", (t)=> {
    t.plan(1);

    router({
      "/like/totally":   ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });
  });

  t.test("Doesn't care about trailing slashes in patterns", (t)=> {
    t.plan(1);

    router({
      "/like/totally/":  ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });
  });

  t.test("Doesn't care about trailing slashes in the pathname", (t)=> {
    window.history.replaceState(null, null, "http://nikolay.rocks/like/totally/");

    t.plan(1);

    router({
      "/like/totally":   ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });
  });
});
