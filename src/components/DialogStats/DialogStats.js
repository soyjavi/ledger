import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Dialog, Price, Text } from '../../reactor/components';
import styles from './DialogStats.style';

const { FIXED, SYMBOL, TX: { TYPE: { EXPENSE } } } = C;
const { COLOR } = THEME;

class DialogStats extends PureComponent {
  static propTypes = {
    category: number,
    type: number,
    onClose: func.isRequired,
    visible: bool,
  };

  static defaultProps = {
    category: 1,
    type: EXPENSE,
    visible: false,
  };

  render() {
    const {
      props: {
        category, type, onClose, visible,
      },
    } = this;
    const currentMonth = (new Date()).getMonth();

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, queryTxs = [] } }) => (
          <Dialog
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.MONTHS[currentMonth]}'s ${l10n.CATEGORIES[type][category]}`}
            visible={visible}
          >
            <Text lighten level={2}>
              {l10n.CLONE_CAPTION}
            </Text>
            { visible && Object.keys(queryTxs).map(key => (
              <View key={key} style={styles.item}>
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: type === EXPENSE ? COLOR.EXPENSES : COLOR.INCOMES,
                      width: `${(queryTxs[key] * 100) / Math.max(...Object.values(queryTxs))}%`, // @TODO: Refacto and improvement
                    },
                  ]}
                />
                <View style={styles.texts}>
                  <Text caption level={2} numberOfLines={1} style={styles.title}>{key.toUpperCase()}</Text>
                  <Price
                    subtitle
                    level={2}
                    fixed={FIXED[baseCurrency]}
                    symbol={SYMBOL[baseCurrency]}
                    value={queryTxs[key]}
                  />
                </View>
              </View>))}
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogStats;
