import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer } from 'context';
import { Price, Text, Touchable } from 'reactor/components';
import { THEME } from 'reactor/common';
import styles from './VaultItem.style';

const { COLOR } = THEME;

const VaultItem = (props) => {
  const {
    balance, caption, currency, title,
  } = props;

  return (
    <Consumer>
      { ({ navigation }) => (
        <Touchable
          rippleColor={COLOR.PRIMARY}
          style={styles.container}
          onPress={navigation.goBack}
        >
          <View style={styles.texts}>
            <Text headline level={6} numberOfLines={1}>{title}</Text>
            <Text level={3} numberOfLines={1}>{caption}</Text>
          </View>
          <Price
            value={parseFloat(balance, 10)}
            fixed={2}
            symbol={currency}
          />
        </Touchable>
      )}
    </Consumer>
  );
};

VaultItem.propTypes = {
  balance: number,
  caption: string,
  currency: string,
  title: string,
};

VaultItem.defaultProps = {
  balance: undefined,
  caption: undefined,
  currency: undefined,
  title: undefined,
};

export default VaultItem;
