import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment } from 'react';
import { View } from 'react-native';

import { exchange } from '../../common';
import { Consumer } from '../../context';
import { Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './VaultItem.style';

const { COLOR } = THEME;

const VaultItem = (props) => {
  const {
    currency, onPress, currentBalance, last30Days: { progression }, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n, store: { baseCurrency, rates } }) => (
        <Touchable onPress={onPress} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
          <View style={styles.content}>
            <Text caption level={2} numberOfLines={1}>{title.toUpperCase()}</Text>
            <PriceFriendly
              headline
              level={5}
              currency={baseCurrency}
              value={baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)}
            />
            { currency !== baseCurrency && (
              <PriceFriendly subtitle level={3} lighten currency={currency} value={currentBalance} />)}

            <View style={styles.separator} />

            <View style={styles.row}>
              { progression
                ? (
                  <Fragment>
                    <Percentage
                      subtitle
                      level={2}
                      value={currentBalance - progression > 0
                        ? (progression * 100) / (currentBalance - progression)
                        : progression}
                    />
                    <View style={styles.separator} />
                    <PriceFriendly
                      subtitle
                      level={3}
                      currency={baseCurrency}
                      lighten
                      value={baseCurrency !== currency
                        ? exchange(Math.abs(progression), currency, baseCurrency, rates)
                        : Math.abs(progression)}
                    />
                  </Fragment>
                )
                : <Text caption lighten>{l10n.WITHOUT_TXS}</Text>
              }
            </View>
          </View>
        </Touchable>
      )}
    </Consumer>

  );
};

VaultItem.propTypes = {
  currency: string.isRequired,
  onPress: func.isRequired,
  currentBalance: number.isRequired,
  last30Days: shape({}),
  title: string.isRequired,
};

VaultItem.defaultProps = {
  last30Days: {},
};

export default VaultItem;
