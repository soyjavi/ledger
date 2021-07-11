import {
  // helpers
  ALIGN,
  SIZE,
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

import { style } from './Completed.style';

const Completed = ({ onPress, ...inherit }) => {
  return (
    <Viewport {...inherit}>
      <SafeAreaView flex={SIZE.XS}>
        <View style={style.content} justifyContent={ALIGN.END} padding={SIZE.M}>
          <Banner
            aling={ALIGN.RIGHT}
            image={BANNERS.COMPLETED}
            marginBottom={LAYOUT.XS}
            title={L10N.ONBOARDING_COMPLETED_TITLE}
            caption={L10N.ONBOARDING_COMPLETED_CAPTION}
          />
          <View alignSelf={ALIGN.END}>
            <Button wide={false} onPress={onPress}>
              {L10N.CONTINUE}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};

Completed.propTypes = {
  onPress: PropTypes.func,
};

export { Completed };
