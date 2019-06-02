import { Storage } from '../../reactor/common';
import { Fingerprint } from '../../reactor/context/Tracking/modules';
import { C } from '../../common';

const { NAME } = C;
const KEY = `${NAME}:context:store`;
const DEFAULT_STORAGE = {};

export default {
  async get() {
    const { fingerprint, ...storage } = await Storage.get(KEY) || DEFAULT_STORAGE;

    return {
      ...storage,
      fingerprint: fingerprint || (await Fingerprint()).uuid,
    };
  },

  async set(value) {
    const {
      baseCurrency, fingerprint, pin, rates = {}, settings, txs = [], vaults = [], version,
    } = value;

    await Storage.set(KEY, {
      baseCurrency,
      fingerprint,
      pin,
      rates,
      settings,
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
