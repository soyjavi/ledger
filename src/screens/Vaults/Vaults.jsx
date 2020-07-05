import { bool } from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Slider, Viewport } from 'reactor/components';

import { C } from '@common';
import { Card, CARD_WIDTH, Footer, Header, Heading, ScrollView } from '@components';
import { useL10N, useNavigation, useSettings, useStore } from '@context';

import { VaultItem } from './components';
import { filter, query } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Vaults = ({ visible, ...inherit }) => {
  const { state = {}, dispatch } = useSettings();
  const navigation = useNavigation();
  const l10n = useL10N();
  const scrollview = useRef(null);
  const { overall, vaults } = useStore();

  const [currencies, setCurrencies] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (visible) setCurrencies(query(vaults));
    else scrollview.current.scrollTo({ y: 0, animated: false });
  }, [visible]);

  console.log('  <Vaults>', { visible, currencies });
  const hasCurrencies = currencies.length > 0;

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} onBack={scroll ? navigation.back : undefined} title={l10n.VAULTS} />

      <ScrollView contentContainerStyle={styles.scroll} onScroll={(value) => setScroll(value)} ref={scrollview}>
        {hasCurrencies && (
          <>
            <Heading marginBottom="XS" paddingHorizontal="M" small value={l10n.CURRENCIES} />
            <Slider itemWidth={CARD_WIDTH} itemMargin={SPACE.S} style={styles.slider}>
              {currencies.map(({ base, currency, ...item }, index) => (
                <Card
                  {...item}
                  currency={currency}
                  disabled={currency !== selected}
                  key={currency}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  onPress={() => setSelected(currency !== selected ? currency : undefined)}
                  percentage={(base * 100) / overall.balance}
                  title={l10n.CURRENCY_NAME[currency] || currency}
                />
              ))}
            </Slider>
          </>
        )}

        {hasCurrencies && <Heading paddingHorizontal="M" small value={l10n.VAULTS} />}
        <>
          {filter(vaults, selected).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={state[vault.hash] !== false}
              dataSource={vault}
              onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </>
      </ScrollView>

      <Footer onBack={navigation.back} onHardwareBack={visible ? navigation.back : undefined} visible={!scroll} />
    </Viewport>
  );
};

Vaults.propTypes = {
  visible: bool,
};

Vaults.defaultProps = {
  visible: true,
};

export default Vaults;
