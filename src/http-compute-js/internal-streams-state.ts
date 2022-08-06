/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 *
 * Portions of this file Copyright Joyent, Inc. and other Node contributors. See LICENSE file for details.
 */

/* These items copied from Node.js: node/lib/internal/streams/state.js. */

export function getDefaultHighWaterMark(objectMode?: boolean) {
  return objectMode ? 16 : 16 * 1024;
}
