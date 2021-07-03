import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner } from '@components';
import { useL10N } from '@context';

import styles from './Welcome.style';

const { DELAY_PRESS_MS } = C;

const Welcome = ({ onPress, ...inherit }) => {
  const l10n = useL10N();

  return (
    <Viewport {...inherit}>
      <SafeAreaView>
        <Banner
          align="left"
          image={BANNERS.WELCOME}
          marginBottom="XL"
          title={l10n.WELCOME_TITLE}
          caption={l10n.WELCOME_CAPTION}
        />
        <Button delay={DELAY_PRESS_MS} onPress={onPress} style={styles.button} text={l10n.GET_STARTED} />
      </SafeAreaView>
    </Viewport>
  );
};

Welcome.propTypes = {
  onPress: PropTypes.func,
};

export { Welcome };
