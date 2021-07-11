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
import PropTypes from 'prop-types';
import React from 'react';

import { BANNERS } from '@assets';
import { L10N } from '@common';
import { Banner, Viewport } from '@components';

import { style } from './Welcome.style';

const Welcome = ({ onPress, ...inherit }) => (
  <Viewport {...inherit}>
    <SafeAreaView flex={SPACE.XS}>
      <View style={style.content} justifyContent={ALIGN.END} padding={SPACE.M}>
        <Banner
          aling={ALIGN.LEFT}
          image={BANNERS.WELCOME}
          marginBottom={LAYOUT.XS}
          title={L10N.WELCOME_TITLE}
          caption={L10N.WELCOME_CAPTION}
        />
        <View alignSelf={ALIGN.START}>
          <Button wide={false} onPress={onPress}>
            {L10N.GET_STARTED}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  </Viewport>
);

Welcome.propTypes = {
  onPress: PropTypes.func,
};

export { Welcome };
