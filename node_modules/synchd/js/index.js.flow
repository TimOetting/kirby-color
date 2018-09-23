/* @flow */

const queues: WeakMap<Object,Promise<any>> = new WeakMap();

function noop() {}

function rethrow(e) {
  throw e;
}

export function synchd<R>(scopeKey: Object, fn: () => Promise<R>): Promise<R> {
  const waitOn = queues.get(scopeKey) || Promise.resolve();
  const p = waitOn.then(fn);

  // The Promise stored in the WeakMap shouldn't contain a value.
  queues.set(scopeKey, p.then(noop, noop));

  // An error handler was added above which would prevent the runtime from
  // possibly detecting an uncaught rejection, so we set up a re-throwing
  // error handler which it's up to the caller to attach an error handler to
  // or not.
  return p.catch(rethrow);
}

export function synchdFn<F: (...args: any[]) => Promise<any>>(scopeKey: Object, fn: F): F {
  return (function() {
    return synchd(scopeKey, () => {
      return fn.apply(this, arguments);
    });
  }: any);
}
