import { bool } from 'prop-types';
import React from 'react';

import { Consumer } from '../../../../context';
import {
  Activity, Icon, Motion, Text,
} from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './Syncing.style';

const { COLOR, MOTION: { DURATION } } = THEME;

const Syncing = ({ scroll }) => (
  <Consumer>
    { ({ l10n, events: { isConnected }, store: { sync } }) => (
      <Motion
        delay={sync ? 0 : DURATION * 2}
        style={styles.container}
        timeline={[{ property: 'translateY', value: !scroll && (!sync || !isConnected) ? 0 : -128 }]}
      >
        { !isConnected && <Icon value="errorOutline" style={styles.icon} /> }
        <Text subtitle level={3} lighten>
          {isConnected ? l10n.SYNC_BLOCKCHAIN : l10n.OFFLINE_MODE}
        </Text>
        { isConnected && <Activity color={COLOR.TEXT_LIGHTEN} /> }
      </Motion>
    )}
  </Consumer>
);

Syncing.propTypes = {
  scroll: bool,
};

Syncing.defaultProps = {
  scroll: false,
};

export default Syncing;
