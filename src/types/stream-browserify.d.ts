declare module 'stream-browserify' {
  import {
    Readable as NodeReadable,
    Writable as NodeWritable,
  } from 'node:stream';
  export const Readable: typeof NodeReadable;
  export const Writable: typeof NodeWritable;
}
