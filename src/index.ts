/// <reference types="@fastly/js-compute" />

export { ComputeJsIncomingMessage } from './http-compute-js/http-incoming';
export { ComputeJsOutgoingMessage } from './http-compute-js/http-outgoing';
export { toReqRes, toComputeResponse, ReqRes, ToReqResOptions, ComputeJsServerResponse } from './http-compute-js/http-server';

export * as polyfill from './polyfill';
