import { AsyncStorage } from 'react-native';

import { C } from '../../common';
import { Fingerprint } from '../../reactor/context/Tracking/modules';

const { NAME } = C;
const KEY = `${NAME}:context:store`;
const DEFAULT_STORAGE = JSON.stringify({});

export default {
  async get() {
    const { fingerprint, ...storage } = JSON.parse(await AsyncStorage.getItem(KEY) || DEFAULT_STORAGE);

    return {
      ...storage,
      fingerprint: fingerprint || (await Fingerprint()).uuid,
    };
  },

  async set(value) {
    const {
      baseCurrency, pin, rates = {}, settings, txs = [], vaults = [], version,
    } = value;

    await AsyncStorage.setItem(KEY, JSON.stringify({
      baseCurrency,
      pin,
      rates,
      settings,
      txs,
      vaults: vaults.map(({ txs, ...vault }) => vault),
      version,
    }));
  },
};
