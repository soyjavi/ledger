import Storage from './storage';

const STORE_VALUE = { hello: 'world' };

describe('Storage', () => {
  it('default', () => {
    expect(Storage).toBeDefined();
    expect(Storage.get).toBeDefined();
    expect(Storage.set).toBeDefined();
  });

  it('methods set', async () => {
    expect.assertions(1);
    const value = await Storage.set(STORE_VALUE);
    expect(value).toBeUndefined(); // JEST don't have access to storage
    // await expect(Storage.get(STORE_KEY)).resolves.toEqual(STORE_VALUE);
  });

  it('method get', async () => {
    expect.assertions(1);
    const value = await Storage.get();
    expect(value).toEqual(null); // JEST don't have access to storage
  });
});
