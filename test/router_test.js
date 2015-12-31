var test  = require("tape");
var jsdom = require("jsdom").jsdom;

// faking it
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window   = document.defaultView;

window.history.replaceState(null, null, "http://nikolay.rocks/like/totally");

var router = require("../lib/router");

test("micro router", (t)=> {
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
    window.history.replaceState(null, null, "/like/totally/");

    t.plan(1);

    router({
      "/like/totally":   ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });
  });

  t.test("Doesn't trigger on subroutes", (t)=> {
    t.plan(1);

    router({
      "/like":         ()=> { t.ok(false); },
      "/like/totally": ()=> { t.ok(true); }
    });
  });

  t.test("It works correctly with the root route", (t)=> {
    t.plan(2);

    window.history.replaceState(null, null, "/");

    router({
      "/":               ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });

    window.history.replaceState(null, null, "http://nikolay.rocks");

    router({
      "/":               ()=> { t.ok(true); },
      "/something/else": ()=> { t.ok(false); }
    });

    window.history.replaceState(null, null, "/like/totally");
  });

  t.test("It recognizes a param in the pattern", (t)=> {
    t.plan(1);

    router({
      "/something/:else": ()=> { t.ok(false); },
      "/like/:what": (params)=> {
        t.deepEqual(params, {what: "totally"});
      }
    });
  });

  t.test("It recognizes a param in the beggining of a pattern", (t)=> {
    t.plan(1);

    router({
      "/:something/else": ()=> { t.ok(false); },
      "/:like/totally": (params)=> {
        t.deepEqual(params, {like: "like"});
      }
    });
  });

  t.test("It can handle several params in the pattern", (t)=> {
    t.plan(1);

    router({
      "/something/else": ()=> { t.ok(false); },
      "/:like/:what": (params)=> {
        t.deepEqual(params, {like: "like", what: "totally"});
      }
    });
  });

  t.test("It can handle whildcards as single tokens", (t)=> {
    t.plan(1);

    router({
      "/something/else": ()=> { t.ok(false); },
      "/like/*what": (params)=> {
        t.deepEqual(params, {what: "totally"});
      }
    });
  });

  t.test("It handles named whildcards throughout the whole pathname", (t)=> {
    t.plan(1);

    router({
      "/something/else": ()=> { t.ok(false); },
      "/*what": (params)=> {
        t.deepEqual(params, {what: "like/totally"});
      }
    });
  });

  t.test("It handles whildcards before the starting slash", (t)=> {
    t.plan(1);

    router({
      "*what": (params)=> {
        t.deepEqual(params, {what: "/like/totally"});
      }
    });
  });

  t.test("It can take a whildcard without a name", (t)=> {
    t.plan(1);

    router({
      "*": (params)=> {
        t.deepEqual(params, {"": "/like/totally"});
      }
    });
  });

  t.test("It handles the extra params in the search line", (t)=> {
    t.plan(1);

    var query = "i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=+Hello%20&empty";

    window.history.replaceState(null, null, "/like/totally?"+ query);

    router({
      "/something/:else": ()=> { t.ok(false); },
      "/like/:what": (params)=> {
        t.deepEqual(params, {
          what:  "totally",
          enc:   " Hello ",
          i:     "main",
          mode:  "front",
          sid:   "de8d49b78a85a322c4155015fdce22c4",
          empty: ""
        });
      }
    });
  })
});
