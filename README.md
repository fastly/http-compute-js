# http-compute-js
A library aiming to provide Node.js-compatible request and response objects

## Usage

In your Compute@Edge JavaScript project (which you can create using `fastly compute init` and the
[Compute@Edge JavaScript Starter Kit](https://github.com/fastly/compute-starter-kit-javascript-empty)),

Add the `@fastly/http-compute-js` package as a development dependency.

```
yarn add --dev @fastly/http-compute-js
```

or

```
yarn add --dev @fastly/http-compute-js
```

In your program:

```javascript
/// <reference types="@fastly/js-compute" />

import http from '@fastly/http-compute-js';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen();
```

`req` and `res` are instances of `ComputeJsIncomingMessage` and `ComputeJsServerResponse`,
respectively, and implement the basic interfaces defined by the Node.js `http` module,
with the basic exception that they are not able to provide access to the underlying socket.
The `socket` (and deprecated `connection`) properties of these objects are not supported.

## Manually instantiating `ComputeJsIncomingMessage` and `ComputeJsServerResponse`

Sometimes, an application or package (for example, "middleware") is designed to interact with
Node.js request and response objects.

```javascript
import { toReqRes, toComputeResponse } from "@fastly/http-compute-js";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));
async function handleRequest(event) {
  // Create Node.js-compatible request and response from event.request
  const { req, res } = toReqRes(event.request);

  // Get URL, method, headers, and body from request
  const url = req.url;
  const method = req.method;
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if(!Array.isArray(value)) {
      value = [String(value)];
    }
    headers[key] = value.join(', ');
  }
  let body = null;
  if (method !== 'GET' && method !== 'HEAD') {
    body = await new Promise(resolve => {
      const data = [];
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.on('end', () => {
        resolve(data.join(''));
      });
    });
  } 

  // Write output to response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    url,
    method,
    headers,
    body,
  }));

  // Convert the response object to Compute@Edge Response object and return it
  return toComputeResponse(res);
}
```
