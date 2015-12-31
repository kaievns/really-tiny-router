module.exports = function(routes) {
  build_config_from(routes);
  window.removeEventListener("popstate", trigger_routing);
  window.addEventListener("popstate", trigger_routing);
  trigger_routing();
};

var config = [];

function build_config_from(routes) {
  config = [];

  for (var pattern in routes) {
    var names    = [];
    var callback = routes[pattern];
    var path_re  = pattern.replace(/\/$/, "")
      .replace(/(\*|:)([a-z0-9]*)/ig, function(m, type, name) {
        names.push(name);
        return type === "*" ? "(.*?)" : "([^\/]+)";
      });

    config.push({
      n: names,
      c: callback,
      r: new RegExp('^'+ path_re +'[\/]?$', "i")
    });
  }
}

function trigger_routing() {
  var path     = current_path();
  var params   = current_params();
  var callback = function() {};

  for (var i=0; i < config.length; i++) {
    var match = path.match(config[i].r);
    if (match) {
      callback = config[i].c;
      break;
    }
  }

  callback(params);
}

function current_path() {
  return document.location.pathname;
}

function current_params() {
  return {};
}
