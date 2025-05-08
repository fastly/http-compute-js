import { Buffer } from 'buffer';
import process from 'process/browser';

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

if (typeof globalThis.process === 'undefined') {
  globalThis.process = process;
}
