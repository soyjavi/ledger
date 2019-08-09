import React from 'react';

import ASSETS from '../../assets';
import { Button, Icon } from '../../reactor/components';

import styles from './ButtonMore.style';

export default ({ ...inherit }) => (
  <Button {...inherit} small contained={false} style={styles.container}>
    <Icon style={styles.icon} value={ASSETS.more} />
  </Button>
);
