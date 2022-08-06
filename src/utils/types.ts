import { ERR_INVALID_ARG_TYPE } from './errors';

export function validateString(value: any, name: string) {
  if (typeof value !== 'string')
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
}

export function isUint8Array(value: any) {
  return value != null && value[Symbol.toStringTag] === 'Uint8Array';
}
