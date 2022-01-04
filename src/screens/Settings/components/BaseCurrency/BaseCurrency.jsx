import {
  // helpers
  COLOR,
  // components
  Text,
  View,
  // hooks
  useStack,
} from '@lookiero/aurora';
import React, { useState } from 'react';

import { L10N } from '@common';
import { Action, Heading, SliderCurrencies } from '@components';
import { useConnection, useStore } from '@context';

import { style } from './BaseCurrency.style';
import { changeBaseCurrency, getLatestRates } from './helpers';

const BaseCurrency = () => {
  const { connected } = useConnection();
  const Stack = useStack();
  const store = useStore();

  const {
    settings: { baseCurrency, lastRatesUpdate = '' },
  } = store;

  const [busy, setBusy] = useState(false);

  const handleChangeCurrency = async (currency) => {
    setBusy(true);
    await changeBaseCurrency({ currency, L10N, Stack, store });
    setBusy(false);
  };

  const handleUpdateRates = async () => {
    setBusy(true);
    await getLatestRates({ Stack, store });
    setBusy(false);
  };
  return (
    <View style={style.container}>
      <Heading value={L10N.CHOOSE_CURRENCY}>
        {connected && (
          <Action disabled={busy} onPress={handleUpdateRates}>
            {L10N.SYNC_RATES_CTA}
          </Action>
        )}
      </Heading>

      <SliderCurrencies style={style.slider} selected={baseCurrency} onChange={handleChangeCurrency} />

      <Text color={COLOR.GRAYSCALE_L} detail level={2} style={[style.hint, style.offset]}>
        {!busy
          ? `${L10N.SYNC_RATES_SENTENCE} ${lastRatesUpdate.toString().split(' ').slice(0, 5).join(' ')}`
          : L10N.WAIT}
      </Text>
    </View>
  );
};

BaseCurrency.displayName = 'BaseCurrency';

export { BaseCurrency };
