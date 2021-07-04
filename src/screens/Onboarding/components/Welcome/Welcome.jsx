import PropTypes from 'prop-types';
import React from 'react';
import {
  // helpers
  ALIGN,
  SIZE as SPACE,
  LAYOUT,
  // components
  Button,
  SafeAreaView,
  View,
} from '@lookiero/aurora';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner, Viewport } from '@components';
import { useL10N } from '@context';

import { style } from './Welcome.style';

const Welcome = ({ onPress, ...inherit }) => {
  const l10n = useL10N();

  return (
    <Viewport {...inherit}>
      <SafeAreaView flex={SPACE.XS}>
        <View customStyle={style.content} justifyContent={ALIGN.END} padding={SPACE.M}>
          <Banner
            aling={ALIGN.LEFT}
            image={BANNERS.WELCOME}
            marginBottom={LAYOUT.XS}
            title={l10n.WELCOME_TITLE}
            caption={l10n.WELCOME_CAPTION}
          />
          <View alignSelf={ALIGN.START}>
            <Button wide={false} onPress={onPress}>
              {l10n.GET_STARTED}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};

Welcome.propTypes = {
  onPress: PropTypes.func,
};

export { Welcome };
