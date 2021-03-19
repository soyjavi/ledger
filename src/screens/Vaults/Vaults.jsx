import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Slider, Viewport } from 'reactor/components';

import { C } from '@common';
import { Card, CARD_SIZE, Header, Heading, ScrollView, Summary } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { VaultItem } from './components';
import { filter, query } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Vaults = ({ visible, ...inherit }) => {
  const navigation = useNavigation();
  const l10n = useL10N();
  const scrollview = useRef(null);
  const {
    overall,
    settings: { baseCurrency, visibleVaults = {} },
    updateSettings,
    vaults,
  } = useStore();

  const [currencies, setCurrencies] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (visible) setCurrencies(query(vaults));
    else scrollview.current.scrollTo({ y: 0, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const hasCurrencies = currencies.length > 0;

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header isVisible={scroll} onBack={navigation.back} title={l10n.VAULTS} />

      <ScrollView onScroll={(value) => setScroll(value)} ref={scrollview}>
        <Summary currency={baseCurrency} title={l10n.VAULTS} />
        {hasCurrencies && (
          <>
            <Heading paddingHorizontal="M" value={l10n.CURRENCIES} />
            <Slider itemWidth={CARD_SIZE} itemMargin={SPACE.S} style={styles.slider}>
              {currencies.map(({ base, currency, ...item }, index) => (
                <Card
                  {...item}
                  currency={currency}
                  highlight={currency === selected}
                  key={currency}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  onPress={() => setSelected(currency !== selected ? currency : undefined)}
                  operator={false}
                  percentage={(base * 100) / overall.currentBalance}
                  title={l10n.CURRENCY_NAME[currency] || currency}
                />
              ))}
            </Slider>
          </>
        )}

        {hasCurrencies && <Heading paddingHorizontal="M" value={l10n.VAULTS} />}
        <>
          {filter(vaults, selected).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={visibleVaults[vault.hash] !== false}
              dataSource={vault}
              onChange={(value) => updateSettings({ visibleVaults: { ...visibleVaults, [vault.hash]: value } })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </>
      </ScrollView>
    </Viewport>
  );
};

Vaults.propTypes = {
  visible: PropTypes.bool,
};

export { Vaults };
