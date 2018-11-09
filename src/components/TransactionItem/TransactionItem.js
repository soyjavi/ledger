import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from 'common';
import { Consumer } from 'context';
import { Price, Text, Touchable } from 'reactor/components';
import { THEME } from 'reactor/common';
import styles from './TransactionItem.style';

const { SCREEN, TX: { TYPE: { EXPENSE } } } = C;
const { COLOR } = THEME;

const TransactionItem = (props) => {
  const {
    hash, timestamp, value, title, type, tags, vault,
  } = props;

  return (
    <Consumer>
      { ({
        store: { vaults = [] },
        navigation: { navigate },
      }) => (
        <Touchable
          rippleColor={COLOR.PRIMARY}
          style={styles.container}
          onPress={() => navigate(SCREEN.TRANSACTION, props)}
        >
          <View style={styles.texts}>
            <Text level={2} lighten numberOfLines={1}>{vaults.find(item => item.hash === vault).title}</Text>
            <Text headline level={6} numberOfLines={1}>{title}</Text>
            <Text level={2} lighten numberOfLines={1}>{timestamp}</Text>
            <Text level={2} numberOfLines={1}>{tags}</Text>
          </View>
          <Price
            caption={type === EXPENSE ? '-' : '+'}
            value={parseFloat(value, 10)}
            fixed={2}
            symbol={vaults.find(item => item.hash === vault).currency}
          />
        </Touchable>
      )}
    </Consumer>
  );
};

TransactionItem.propTypes = {
  hash: string,
  timestamp: string,
  value: number,
  title: string,
  type: string,
  tags: string,
  vault: string,
};

TransactionItem.defaultProps = {
  hash: undefined,
  timestamp: undefined,
  value: undefined,
  title: undefined,
  type: undefined,
  tags: undefined,
  vault: undefined,
};

export default TransactionItem;
