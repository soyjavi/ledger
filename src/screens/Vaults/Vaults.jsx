import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Slider, Text, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Footer, Header, Heading, ScrollView } from '../../components';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { CURRENCYCARD_WIDTH, CurrencyCard, VaultItem } from './components';
import { filter, query } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Vaults = ({ visible, ...inherit }) => {
  const { state = {}, dispatch } = useSettings();
  const navigation = useNavigation();
  const l10n = useL10N();
  const { vaults } = useStore();

  const [scroll, setScroll] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (visible) setCurrencies(query(vaults));
  }, [visible]);

  console.log('<Vaults>', { visible, scroll, currencies });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight title={l10n.VAULTS} />

      <ScrollView onScroll={setScroll} contentContainerStyle={styles.scroll}>
        {currencies.length > 0 && (
          <>
            <Heading value="Currencies" paddingHorizontal="M">
              <Text caption bold>
                {currencies.length}
              </Text>
            </Heading>
            <Slider itemWidth={CURRENCYCARD_WIDTH + SPACE.S} itemMargin={0} style={styles.slider}>
              {currencies.map(({ currency, ...item }) => (
                <CurrencyCard
                  {...item}
                  currency={currency}
                  key={currency}
                  onPress={() => setSelected(currency !== selected ? currency : undefined)}
                  selected={currency === selected}
                />
              ))}
            </Slider>
          </>
        )}

        <Heading value="Vaults" paddingHorizontal="M">
          <Text caption bold>
            10
          </Text>
        </Heading>
        <View style={styles.currencies}>
          {filter(vaults, selected).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={state[vault.hash] !== false}
              dataSource={vault}
              onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </View>
      </ScrollView>

      <Footer onBack={navigation.back} onHardwareBack={visible ? () => navigation.back() : undefined} />
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
