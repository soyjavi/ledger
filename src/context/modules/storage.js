import { Storage } from '../../reactor/common';
import { Fingerprint } from '../../reactor/context/Tracking/modules';
import { C } from '../../common';

const { NAME } = C;
const KEY = `${NAME}:context:store`;
const DEFAULT_STORAGE = {};

export default {
  async get() {
    const storage = await Storage.get(KEY) || DEFAULT_STORAGE;

    if (storage.fingerprint) return storage;
    const { uuid: secret, device_id: fingerprint } = await Fingerprint();

    return { ...storage, fingerprint, secret };
  },

  async set(value) {
    const {
      authorization, baseCurrency, fingerprint, pin, rates = {}, secret, txs = [], vaults = [], version,
    } = value;

    await Storage.set(KEY, {
      authorization,
      baseCurrency,
      fingerprint,
      pin,
      rates,
      secret,
      txs,
      vaults: vaults.map(({
        balance, currency, hash, title,
      }) => ({
        balance, currency, hash, title,
      })),
      version,
    });
  },
};
