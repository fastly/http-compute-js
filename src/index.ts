/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

/// <reference types="@fastly/js-compute" />

import './polyfills.js';

export { ComputeJsIncomingMessage } from './http-compute-js/http-incoming.js';
export { ComputeJsOutgoingMessage } from './http-compute-js/http-outgoing.js';
export {
  STATUS_CODES,
  createServer,
  toReqRes,
  toComputeResponse,
  ComputeJsServerResponse,
  HttpServer,
  HttpServerOptions,
  ReqRes,
  ToReqResOptions,
} from './http-compute-js/http-server.js';

import {
  createServer
} from './http-compute-js/http-server.js';
export default {
  createServer,
};
