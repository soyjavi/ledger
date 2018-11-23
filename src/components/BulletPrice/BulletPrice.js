import { bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { iconTrendingDown, iconTrendingUp } from '../../assets';
import { Icon, Price } from '../../reactor/components';
import styles from './BulletPrice.style';

const BulletPrice = ({ income, ...inherit }) => (
  <View style={[styles.container, income && styles.income]}>
    <View style={styles.bullet}>
      <Icon value={income ? iconTrendingUp : iconTrendingDown} style={styles.icon} />
    </View>
    <Price title={income ? '+' : undefined} lighten subtitle level={3} {...inherit} />
  </View>
);

BulletPrice.propTypes = {
  income: bool,
};

BulletPrice.defaultProps = {
  income: false,
};

export default BulletPrice;
