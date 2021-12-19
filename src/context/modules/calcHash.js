import { SHA256 } from 'crypto-js';

export const calcHash = (data = {}) =>
  SHA256(new Date().getTime().toString() + JSON.stringify({ ...data, timestamp: new Date().getTime() })).toString();
