import { MaterialCommunityIcons } from '@expo/vector-icons';
import { bool } from 'prop-types';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Footer, Header, Heading } from '../../components';
import {
  useL10N, useNavigation, useSettings, useStore,
} from '../../context';
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
      <Header highlight title={l10n.VAULTS} />

      <ScrollView contentContainerStyle={styles.container}>
        <Heading value={`${l10n.VAULTS} ${l10n.VISIBILITY}`}>
          <Button contained={false} small onPress={() => setOrder(!order)}>
            <MaterialCommunityIcons
              name={order ? 'sort-descending' : 'sort-ascending'}
              color={COLOR.TEXT}
              size={20}
            />
          </Button>
        </Heading>
        <View style={styles.currencies}>
          { sort(vaults, order).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={state[vault.hash]}
              dataSource={vault}
              onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        onBack={navigation.back}
        onHardwareBack={visible ? () => navigation.back() : undefined}
      />
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
