import { bool } from 'prop-types';
import React from 'react';

import { Consumer } from '../../../../context';
import { Button, Motion } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './Syncing.style';

const { COLOR } = THEME;

const Syncing = ({ scroll }) => (
  <Consumer>
    { ({ l10n, events: { isConnected }, store: { onSync, sync } }) => (
      <Motion
        style={styles.container}
        timeline={[{ property: 'translateY', value: !sync || !isConnected || (sync && !scroll) ? 0 : 128 }]}
      >
        <Button
          activity={!sync && isConnected}
          color={isConnected // eslint-disable-line
            ? (sync ? COLOR.PRIMARY : COLOR.WHITE)
            : COLOR.ERROR
          }
          onPress={isConnected && sync ? onSync : undefined}
          rounded
          small
          title={isConnected // eslint-disable-line
            ? (sync ? l10n.TAP_TO_UPDATE : l10n.SYNCING)
            : l10n.OFFLINE_MODE
          }
        />
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
