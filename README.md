# @fastly/http-compute-js

A library aiming to provide Node.js-compatible request and response objects.

Compute@Edge provides [Request and Response objects](https://developer.fastly.com/learning/compute/javascript/#composing-requests-and-responses),
but these are based on the modern [Fetch standard](https://fetch.spec.whatwg.org/), rather than the `req` and `res` objects
traditionally seen in Node.js programs.  If you are more familiar with using the Node.js request and response objects, or
have some libraries that work with them, this library aims to let you do that.

## Usage

To your Compute@Edge JavaScript project (which you can create using `fastly compute init` and the
[Compute@Edge JavaScript Starter Kit](https://github.com/fastly/compute-starter-kit-javascript-empty)),

add the `@fastly/http-compute-js` package as a development dependency.

```
yarn add --dev @fastly/http-compute-js
```

or

```
npm install --save-dev @fastly/http-compute-js
```

In your program:

```javascript
import http from '@fastly/http-compute-js';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen();
```

`req` and `res` are implementations of [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) and
[`ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse), respectively, and
can be used as in a Node.js program.

`req` is an `IncomingMessage` object whose `Readable` interface has been wired to the body of the Compute@Edge request's body
stream. As such, you can read from it using the standard `on('data')`/`on('end')` mechanisms, or using
libraries such as [`parse-body`](https://www.npmjs.com/package/parse-body). You can also read the
headers and other information using the standard interface.

`res` is a `ServerResponse` object whose `Writable` interface is wired to an in-memory buffer.
Write to it normally using `res.write()` / `res.end()` or pipe to it using `res.pipe()`. You can also set
headers and status code using the standard interfaces.

### Notes / Known Issues

* The aim of this library is to provide compatibility where practical. Please understand that some features are not possible
  to achieve 100% compatibility with Node.js, due to platform differences.
* Other libraries that consume `IncomingMessage` and `ServerResponse` may or may not be compatible with Compute@Edge. Some
  may work with the use of [polyfills, applied during module bundling](https://developer.fastly.com/learning/compute/javascript/#module-bundling).
* HTTP Version is currently always reported as `1.1`.
* Unlike in Node.js, the `socket` property of these objects is always `null`, and cannot be assigned.
* Some functionality is not (yet) supported: `http.Agent`, `http.ClientRequest`, `http.get()`, `http.request()`, to name a few.
* Transfer-Encoding: chunked does not work at the moment and has been disabled.
* At the current time, the `ServerResponse` write stream must be finished before the `Response` object is generated.

### Webpack polyfills

In order to use this library you must add a number of polyfill configurations to the
`webpack.config.js` of your Compute@Edge project. Specifically, add the following `webpack.ProvidePlugin`
to the `plugins` array, and add the following items to the `alias` and `fallback` sections,
creating the `resolve`, `alias`, and `fallback` properties as needed if they do not exist. 

```javascript
module.exports = {
  /* other config */
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: [ 'buffer', 'Buffer' ],
      process: 'process',
    }),
  ],
  resolve: {
    fallback: {
      'buffer': require.resolve('buffer/'),
      'process': require.resolve('process/browser'),
      'stream': require.resolve('stream-browserify'),
    }
  },
};
```

### Example

The following is an example that reads the URL, method, headers, and body from the
request, and writes a response.

```javascript
import http from '@fastly/http-compute-js';

const server = http.createServer(async (req, res) => {
  // Get URL, method, headers, and body from req
  const url = req.url;
  const method = req.method;
  const headers = {};
  for (let [key, value] of Object.entries(req.headers)) {
    if(!Array.isArray(value)) {
      value = [String(value)];
    }
    headers[key] = value.join(', ');
  }
  let body = null;
  if (method !== 'GET' && method !== 'HEAD') {
    // Reading data out of a stream.Readable 
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

  // Write output to res
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    url,
    method,
    headers,
    body,
  }));
});

server.listen();
```

## The `server` object

`server` is an instance of `HttpServer`, modeled after [`http.Server`](https://nodejs.org/api/http.html#class-httpserver).
It is created using the `createServer()` function, usually passing in your request handler.
The `server` begins to listen for `fetch` events once the `listen()` function is called.

`createServer([onRequest])`
* Instantiates an `HttpServer` instance, optionally passing in an onRequest listener.
* Parameters:
  * `onRequest` - (optional) supplying this is equivalent to calling `server.on('request', onRequest)`
    after instantiation.
* Returns: an `HttpServer` instance.

`HttpServer` class members:
- `listen([port][,onListening])`
  * Starts the `server` listening for `fetch` events.
  * Parameters:
    * `port` - (optional) a port number. This argument is purely for API compatibility with Node's `server.listen()`,
      and is ignored by Compute@Edge.
    * `onListening` - (optional) supplying this is equivalent to calling `server.on('listening', onListening)` before
      calling this method.
- event: `'listening'`
  * Emitted when the `fetch` event handler has been established after calling `server.listen()`.
- event: `'request'`
  * Emitted each time there is a request.
  * Parameters:
    * `request` - `http.IncomingMessage`
    * `response` - `http.ServerResponse`

## Manual instantiation of `req` and `res`

Sometimes, you may need to use Node.js-compatible request and response objects for only some parts of your
application.  Or, you may be working with an existing application or package (for example, "middleware")
designed to  interact with these objects.

`@fastly/http-compute-js` provides utility functions that help in this case to help you go back
and forth between the `Request` and `Response` objects used in Compute@Edge and their Node.js-compatible
counterparts.

`toReqRes(request)`
* Converts from a Compute@Edge-provided `Request` object to a pair of Node.js-compatible
  request and response objects.
* Parameters:
  * `request` - A [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. You would
    typically obtain this from the `request` property of the `event` object received by your `fetch` event
    handler.
* Returns: an object with the following properties.
  * `req` - An [`http.IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage)
    object whose `Readable` interface has been wired to the `Request` object's `body`. NOTE: This is an error
    if the `Request`'s `body` has already been used.
  * `res` - An [`http.ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse)
    object whose `Writable` interface has been wired to an in-memory buffer.

`toComputeResponse(res)`
* Creates a new `Response` object from the `res` object above, based on the status code, headers, and body that has been
  written to it. This `Response` object is typically used as the return value from a Compute@Edge `fetch` handler.
* Parameters:
  * `res` - An `http.ServerResponse` object created by `toReqRes()`.
* Returns: a promise that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
* NOTE: This function returns a `Promise` that resolves to a `Response` once the `res` object emits the
  [`'finish'`](https://nodejs.org/api/http.html#event-finish) event, which typically happens when you call
  [`res.end()`](https://nodejs.org/api/http.html#responseenddata-encoding-callback). If your application never signals the
  end of output, this promise will never resolve, and your application will likely time out.
* If an error occurs, the promise will reject with that error.

### Example

The following is an example that shows the use of the manual instantiation functions in a Compute@Edge
JavaScript application written using a `fetch` event listener. Node.js-compatible `req` and `res`
objects are produced from `event.request`. After having some output written, a `Response` object is
created from the `res` object and returned from the event listener.

```javascript
/// <reference types='@fastly/js-compute' />
import { toReqRes, toComputeResponse } from '@fastly/http-compute-js';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));
async function handleRequest(event) {
  // Create Node.js-compatible req and res from event.request
  const { req, res } = toReqRes(event.request);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));

  // Create a Compute-at-Edge Response object based on res, and return it
  return await toComputeResponse(res);
}
```

## Issues

If you encounter any non-security-related bug or unexpected behavior, please [file an issue][bug]
using the bug report template.

[bug]: https://github.com/fastly/http-compute-js/issues/new?labels=bug

### Security issues

Please see our [SECURITY.md](./SECURITY.md) for guidance on reporting security-related issues.

## License

[MIT](./LICENSE).

In order for this library to function without requiring a direct dependency on Node.js itself,
portions of the code in this library are adapted / copied from Node.js.
Those portions are Copyright Joyent, Inc. and other Node contributors.
See the LICENSE file for details.
