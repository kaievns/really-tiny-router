# Micro Router

A zero-whistles, bare metal HTML5 router that supports push state. When you need
to just route your stuff somewhere and be done with it.

## Usage

The basic routing looks kind of like that:

```js
import route from "micro-router";

route({
  "/users":              callback1,
  "/users/:id":          callback2,
  "/posts/:year/:month": callback3,
  "*":                   callback4
});
```

__NOTE__: this call kicks in the routing right away

## Copyright & License

All code in this repository is released under the terms of the MIT license.

Copyright (C) 2015-2016 Nikolay Nemshilov
