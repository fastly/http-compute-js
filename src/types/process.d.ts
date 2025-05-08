declare module 'process/browser' {
  import nodeProcess from 'node:process';
  export = nodeProcess;
}
