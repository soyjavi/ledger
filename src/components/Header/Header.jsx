import { COLOR, Theme, Header as AuroraHeader, Text, View } from '@lookiero/aurora';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { colorOpacity, L10N, onHardwareBackPress } from '@common';
import { useConnection } from '@context';

import { style } from './Header.style';

const Header = ({ isVisible = true, onBack, title = ' ' }) => {
  const { connected } = useConnection();

  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <>
      <StatusBar style="light" translucent />

      <AuroraHeader
        container={({ children }) => (
          <BlurView intensity={!isVisible ? 0 : undefined} style={style.blur} tint="dark">
            {children}
          </BlurView>
        )}
        style={style.header}
        onBack={onBack}
      >
        {isVisible && (
          <Text heading level={2} style={style.title}>
            {title}
          </Text>
        )}
        {!connected && (
          <View style={[style.offline, { backgroundColor: colorOpacity(Theme.get('colorAlert'), 0.2) }]}>
            <Text action color={COLOR.ALERT}>
              {L10N.OFFLINE}
            </Text>
          </View>
        )}
      </AuroraHeader>
    </>
  );
};

Header.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  onBack: PropTypes.func,
};

export { Header };
