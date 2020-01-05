import { bool } from 'prop-types';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Footer, Header } from '../../components';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { VaultItem } from './components';
import { sort } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { COLOR } = THEME;

const Vaults = ({ visible, ...inherit }) => {
  const { state = {}, dispatch } = useSettings();
  const navigation = useNavigation();
  const l10n = useL10N();
  const { vaults } = useStore();

  const [order, setOrder] = useState(true);

  console.log('<Vaults>', { visible });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight title={l10n.VAULTS}>
        <Button
          contained={false}
          icon={order ? 'sort-descending' : 'sort-ascending'}
          iconSize={24}
          onPress={() => setOrder(!order)}
          small
        />
      </Header>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.currencies}>
          {sort(vaults, order).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={state[vault.hash] !== false}
              dataSource={vault}
              onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </View>
      </ScrollView>

      <Footer onBack={navigation.back} onHardwareBack={visible ? () => navigation.back() : undefined} />
    </Viewport>
  );
};

Vaults.propTypes = {
  visible: bool,
};

Vaults.defaultProps = {
  visible: true,
};

export default Vaults;
