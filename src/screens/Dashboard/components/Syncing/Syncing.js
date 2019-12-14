import { bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer, useConnection } from '../../../../context';
import { Button, Motion } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './Syncing.style';

const { COLOR } = THEME;

const Syncing = ({ scroll }) => {
  const { connected } = useConnection();

  return (
    <Consumer>
      { ({ l10n, store: { onSync, sync } }) => (
        <View>
          <Motion
            style={styles.container}
            timeline={[{ property: 'translateY', value: !sync || !connected ? 0 : 128 }]}
          >
            <Button
              activity={connected}
              color={connected ? undefined : COLOR.ERROR}
              rounded
              small
              title={connected ? l10n.SYNCING : l10n.OFFLINE_MODE}
            />
          </Motion>

          <Motion
            style={styles.container}
            timeline={[{ property: 'translateY', value: connected && sync && !scroll ? 0 : 128 }]}
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
};

Syncing.propTypes = {
  scroll: bool,
};

Syncing.defaultProps = {
  scroll: false,
};

export default Syncing;
