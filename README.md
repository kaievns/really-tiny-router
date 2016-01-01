# Really Tiny Router

A zero-whistles, bare metal HTML5 router that supports push state. When you need
to just route your stuff somewhere and be done with it.

## Usage

The basic routing looks kind of like that:

```js
import { route } from "really-tiny-router";

route({
  "/users":              callback1,
  "/users/:id":          callback2,
  "/posts/:year/:month": callback3,
  "*whatevs":            callback4
});
```

__NOTE__: this call kicks in the routing right away

There is also couple of methods to work with the HTML5 history that tap into
the configured routes:

```js
import { push, replace } from "really-tiny-router";

// pushing a new state into the history
push("http://nikolay.rocks/blah"[, title]);

// replacing the current state in the history
replace("/something/else"[, title]);
```

## Copyright & License

All code in this repository is released under the terms of the MIT license.

Copyright (C) 2015-2016 Nikolay Nemshilov
