import { bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer } from '../../../../context';
import { Button, Motion } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './Syncing.style';

const { COLOR } = THEME;

const Syncing = ({ scroll }) => (
  <Consumer>
    { ({ l10n, events: { isConnected }, store: { onSync, sync } }) => (
      <View>
        <Motion
          style={styles.container}
          timeline={[{ property: 'translateY', value: !sync || !isConnected ? 0 : 128 }]}
        >
          <Button
            activity={isConnected}
            color={isConnected ? undefined : COLOR.ERROR}
            rounded
            small
            title={isConnected ? l10n.SYNCING : l10n.OFFLINE_MODE}
          />
        </Motion>

        <Motion
          style={styles.container}
          timeline={[{ property: 'translateY', value: isConnected && sync && !scroll ? 0 : 128 }]}
        >
          <Button
            color={COLOR.TEXT}
            onPress={onSync}
            rounded
            small
            title={l10n.TAP_TO_UPDATE}
          />
        </Motion>
      </View>
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
