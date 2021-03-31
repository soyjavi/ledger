import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { C } from '@common';
import { Card, CARD_SIZE, Header, Heading, ScrollView } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { VaultItem } from './components';
import { filter, query } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Vaults = () => {
  const navigation = useNavigation();
  const l10n = useL10N();
  const { overall, vaults } = useStore();

  const [currencies, setCurrencies] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    setCurrencies(query(vaults));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCurrencies = currencies.length > 0;

  return (
    <>
      <Header visible={scroll} title={l10n.VAULTS} />

      <ScrollView onScroll={(value) => setScroll(value)}>
        {hasCurrencies && (
          <>
            <Heading marginTop="S" paddingLeft="M" value={l10n.CURRENCIES} />

            <Slider itemWidth={CARD_SIZE} itemMargin={SPACE.S} style={styles.slider}>
              {currencies.map(({ base, currency, ...item }, index) => (
                <Card
                  {...item}
                  key={currency}
                  currency={currency}
                  highlight={currency === selected}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  operator={false}
                  percentage={(base * 100) / overall.currentBalance}
                  title={l10n.CURRENCY_NAME[currency] || currency}
                  onPress={() => setSelected(currency !== selected ? currency : undefined)}
                />
              ))}
            </Slider>
          </>
        )}

        {hasCurrencies && <Heading paddingHorizontal="M" value={l10n.VAULTS} />}
        <>
          {filter(vaults, selected).map((vault) => (
            <VaultItem key={vault.hash} dataSource={vault} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
          ))}
        </>
      </ScrollView>
    </>
  );
};

Vaults.propTypes = {};

export { Vaults };
