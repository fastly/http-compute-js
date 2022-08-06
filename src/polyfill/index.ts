/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

// This file provides a number of polyfills that may be used when consuming
// this library:

// setTimeout
// clearTimeout

// See README.md for instructions on adding these polyfills to your webpack.config.js.

let _nextTimeout: number = 0;
const activeTimeouts = new Set<number>();
function getNextTimeout() {
  _nextTimeout++;
  activeTimeouts.add(_nextTimeout);
  return _nextTimeout;
}

export function setTimeout(fn: () => void, timeout: number) {
  if(timeout != null && timeout !== 0) {
    console.log("setTimeout with timeout not 0, this might not be good");
  }
  const timeoutId = getNextTimeout();
  queueMicrotask(() => {
    if(!activeTimeouts.has(timeoutId)) {
      return;
    }
    activeTimeouts.delete(timeoutId);
    fn();
  });
  return timeoutId;
}

export function clearTimeout(timeoutId: number) {
  activeTimeouts.delete(timeoutId);
}
