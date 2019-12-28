import { bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Button, Motion } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import { useConnection, useL10N, useStore } from '../../../../context';
import { getProfile } from '../../../../services';
import styles from './Syncing.style';

const { COLOR } = THEME;

const Syncing = ({ scroll }) => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const store = useStore();
  const { setSync, sync } = store;

  const handleSync = async () => {
    setSync(false);
    await getProfile(store);
    setSync(true);
  };

  return (
    <View>
      <Motion
        style={styles.container}
        timeline={[{ property: 'translateY', value: !sync || !connected ? 0 : 128 }]}
      >
        <Button
          activity={connected}
          color={connected ? undefined : COLOR.ERROR}
          small
          title={connected ? undefined : l10n.OFFLINE_MODE}
        />
      </Motion>

      <Motion
        style={styles.container}
        timeline={[{ property: 'translateY', value: connected && sync && !scroll ? 0 : 128 }]}
      >
        <Button
          color={COLOR.BACKGROUND}
          onPress={handleSync}
          small
          title={l10n.TAP_TO_UPDATE}
        />
      </Motion>
    </View>
  );
};

Syncing.propTypes = {
  scroll: bool,
};

Syncing.defaultProps = {
  scroll: false,
};

export default Syncing;
