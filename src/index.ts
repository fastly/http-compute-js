/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

/// <reference types="@fastly/js-compute" />

export { ComputeJsIncomingMessage } from './http-compute-js/http-incoming';
export { ComputeJsOutgoingMessage } from './http-compute-js/http-outgoing';
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
} from './http-compute-js/http-server';

import {
  createServer
} from './http-compute-js/http-server';
export default {
  createServer,
};
