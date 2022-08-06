/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

// This file modeled after Node.js - /lib/internal/streams/state.js

export function getDefaultHighWaterMark(objectMode?: boolean) {
  return objectMode ? 16 : 16 * 1024;
}
