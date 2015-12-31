# Micro Router

A zero-whistles, bare metal HTML5 router that supports push state. When you need
to just route your stuff somewhere and be done with it.

## Usage

The basic routing looks kind of like that:

```js
import { route } from "micro-router";

route({
  "/users":              callback1,
  "/users/:id":          callback2,
  "/posts/:year/:month": callback3,
  "*":                   callback4
});
```

__NOTE__: the `route` method kicks in the routing right away

Working with the HTML5 push state:

```js
import { push, replace } from "micro-router";

push("/nikolay/rocks"[, title]);    // push in a new state
replace("/nikolay/rocks"[, title]); // replace the current state
```

Additionally you can highjack link clicks to automatically push their urls in:

```js
import { highjackLinks } from "micro-router";

// highjacks all links that start with "/"
highjackLinks(true);

// if you need more flexibility around highjacking
// only highjack links that have class "local" on them
highjackLinks((link)=> { link.classList.contains("local") });
```

## Copyright & License

All code in this repository is released under the terms of the MIT license.

Copyright (C) 2015-2016 Nikolay Nemshilov
