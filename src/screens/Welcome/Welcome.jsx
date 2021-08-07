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
import { useRouter } from '@lookiero/router';
import React from 'react';

import { BANNERS } from '@assets';
import { L10N, ROUTE } from '@common';
import { Banner, Viewport } from '@components';

import { style } from './Welcome.style';

const Welcome = () => {
  const { go } = useRouter();

  return (
    <Viewport path={ROUTE.WELCOME}>
      <SafeAreaView flex={SPACE.XS}>
        <View style={style.content} justifyContent={ALIGN.END} padding={SPACE.M}>
          <Banner
            align={ALIGN.LEFT}
            image={BANNERS.WELCOME}
            marginBottom={LAYOUT.XS}
            title={L10N.WELCOME_TITLE}
            caption={L10N.WELCOME_CAPTION}
          />
          <View alignSelf={ALIGN.START}>
            <Button wide={false} onPress={() => go({ path: ROUTE.SESSION })}>
              {L10N.GET_STARTED}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};

export { Welcome };
