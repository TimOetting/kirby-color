# synchd

[![Circle CI](https://circleci.com/gh/AgentME/synchd.svg?style=shield)](https://circleci.com/gh/AgentME/synchd)
[![npm version](https://badge.fury.io/js/synchd.svg)](https://badge.fury.io/js/synchd)

This module allows guarded sections of code to be made that execute exclusively
in the order they're called.

Similar to [node-synchronized](https://github.com/jupiter/node-synchronized),
but uses Promises and includes Flow type declarations.

## API

This project exports the `synchd` and `synchdFn` functions. If you're using an
ES6 compiler, you can access them like this:

```js
import {synchd, synchdFn} from 'synchd';
```

Or you can access the functions through the classic CommonJS style:

```js
var synchd = require('synchd');
// synchd.synchd(...)
// synchd.synchdFn(...)
```

### synchd(scopeKey, fn)

`scopeKey` may be any object and it's used as the lock. No other synchd calls
with the same scopeKey given will be run at the same time; they will be queued
in-order to run after. `fn` is a function which takes no arguments and must
return a Promise.

This call returns a Promise that resolves to the same value that the Promise
returned by `fn` resolves to.

### synchdFn(scopeKey, fn)

This is a convenience function for creating functions that are entirely wrapped
in a synchd call with a single scopeKey.

`scopeKey` has the same meaning as above. `fn` is a function that may take
arguments and must return a Promise.

This call returns a function with the same signature as `fn`. All arguments
passed to the function will be passed on to `fn` when it gets executed, and the
returned Promise will resolve to the value of the Promise that `fn` returns.

Here's an example of defining a single function which can't be running multiple
times concurrently. This example assumes you're using a compiler which supports
async/await.

```js
import {synchdFn} from 'synchd';
import delay from 'pdelay';

const exclusiveFunction = synchdFn({}, async (x) => {
  console.log(`exclusiveFunction(${x}) started`);
  await delay(100);
  console.log(`exclusiveFunction(${x}) ending`);
  return x+1;
});

exclusiveFunction(5);
exclusiveFunction(6);

// The following will be printed:
// exclusiveFunction(5) started
// exclusiveFunction(5) ending
// exclusiveFunction(6) started
// exclusiveFunction(6) ending
```

## Types

[Flow](https://flowtype.org/) type declarations for this module are included!
If you are using Flow, they won't require any configuration to use.
