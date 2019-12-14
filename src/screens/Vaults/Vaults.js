import { bool } from 'prop-types';
import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Viewport } from '../../reactor/components';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import {
  Footer, Header, HorizontalChartItem, OptionItem, PriceFriendly,
} from '../../components';
import { Consumer, useNavigation, useSettings } from '../../context';
import { query, sort } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { COLOR } = THEME;

const Vaults = ({ visible, ...inherit }) => {
  const navigation = useNavigation();
  const { state, dispatch } = useSettings();
  const currencies = visible ? query(inherit) : [];

  console.log('<Vaults>', { visible });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Consumer>
        { ({ l10n, store: { baseCurrency, vaults } }) => (
          <Fragment>
            <Header highlight title={l10n.VAULTS} />
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.currencies}>
                { currencies.map(({ base, currency, weight }) => (
                  <Fragment key={currency}>
                    <HorizontalChartItem
                      color={COLOR[currency]}
                      key={currency}
                      currency={baseCurrency}
                      image={FLAGS[currency]}
                      style={styles.horizontalChart}
                      title={currency}
                      value={base}
                      width={weight}
                    />
                    <View style={styles.vaults}>
                      { sort(vaults, currency).map((vault) => (
                        <OptionItem
                          key={vault.hash}
                          active={state[vault.hash]}
                          onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
                          onPress={() => navigation.navigate(SCREEN.VAULT, vault)}
                          {...vault}
                        >
                          <PriceFriendly lighten currency={currency} value={vault.currentBalance} />
                        </OptionItem>
                      ))}
                    </View>
                  </Fragment>
                ))}
              </View>
            </ScrollView>

            <Footer
              onBack={navigation.goBack}
              onHardwareBack={visible ? navigation.goBack : undefined}
            />
          </Fragment>
        )}
      </Consumer>
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
