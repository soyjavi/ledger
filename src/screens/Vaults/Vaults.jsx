import { Slider } from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import React, { useLayoutEffect, useState } from 'react';

import { L10N, ROUTE } from '@common';
import { Card, CARD_SIZE, Heading } from '@components';
import { useStore } from '@context';

import { VaultItem } from './components';
import { filter, query } from './modules';
import { style } from './Vaults.style';

const Vaults = () => {
  const { go } = useRouter();
  const { overall, vaults } = useStore();

  const [currencies, setCurrencies] = useState([]);
  const [selected, setSelected] = useState();

  useLayoutEffect(() => {
    setCurrencies(query(vaults));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCurrencies = currencies.length > 0;

  return (
    <>
      {hasCurrencies && (
        <>
          <Heading value={L10N.CURRENCIES} />

          <Slider horizontal snapInterval={CARD_SIZE} style={style.slider}>
            {currencies.map(({ base, currency, ...item }, index) => (
              <Card
                {...item}
                key={currency}
                currency={currency}
                highlight={currency === selected}
                operator={false}
                percentage={(base * 100) / overall.currentBalance}
                title={L10N.CURRENCY_NAME[currency] || currency}
                style={index === 0 ? style.firstCard : style.card}
                onPress={() => setSelected(currency !== selected ? currency : undefined)}
              />
            ))}
          </Slider>
        </>
      )}

      {hasCurrencies && <Heading value={L10N.VAULTS} />}
      {filter(vaults, selected).map((vault) => (
        <VaultItem
          key={vault.hash}
          dataSource={vault}
          onPress={() => go({ path: `${ROUTE.VAULT}/${vault.hash}`, props: vault })}
        />
      ))}
    </>
  );
};

Vaults.displayName = 'Vaults';

export { Vaults };
