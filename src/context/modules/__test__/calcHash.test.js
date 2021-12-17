import { calcHash } from '../calcHash';

const previousHash = 'b894bd2ef4b59974e2704ec677524f3732bb1e9018c63b0d98df4224ca59dbca';
const timestamp = new Date(1980, 10, 4, 0, 0, 0).getTime();
const data = { hello: 'world' };
const nonce = 32;

describe('calcHash', () => {
  it('default', () => {
    const hash = calcHash();
    expect(hash).toEqual(previousHash);
  });

  it('add previousHash', () => {
    const hash = calcHash({ previousHash });
    expect(hash.length).toEqual(64);
  });

  it('add timestamp', () => {
    const hash = calcHash({ previousHash, timestamp });
    expect(hash.length).toEqual(64);
  });

  it('add data', () => {
    const hash = calcHash({ previousHash, timestamp, data });
    expect(hash.length).toEqual(64);
  });

  it('add nonce', () => {
    const hash = calcHash({
      previousHash,
      timestamp,
      data,
      nonce,
    });
    expect(hash.length).toEqual(64);
  });
});
