import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Motion, View } from 'reactor/components';
import { Icon, Text, Touchable } from 'reactor/components';

import { C } from '@common';
import { useL10N } from '@context';

import styles from './Footer.style';

const { SCREEN } = C;
const { BLUR, COLOR, ICON, MOTION, UNIT } = THEME;

const Footer = ({ current, visible, onScreen }) => {
  const l10n = useL10N();

  const OPTIONS = [
    { icon: 'home', text: l10n.DASHBOARD, screen: SCREEN.DASHBOARD },
    { icon: 'chart', text: l10n.ACTIVITY, screen: SCREEN.STATS },
    { icon: 'list', text: l10n.VAULTS, screen: SCREEN.VAULTS },
    { icon: 'settings', text: l10n.SETTINGS, screen: SCREEN.SETTINGS },
  ];

  return (
    <Motion
      delay={MOTION.COLLAPSE}
      duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
      pointerEvents="auto"
      style={styles.container}
      timeline={[{ property: 'translateY', value: visible ? 0 : UNIT * 16 }]}
    >
      <BlurView {...BLUR} style={styles.blur}>
        <View style={styles.content}>
          {OPTIONS.map(({ icon, text, screen }, index) => (
            <Touchable
              containerBorderRadius={0}
              key={index}
              rippleColor={COLOR.LIGHTEN}
              style={styles.option}
              onPress={() => onScreen(screen)}
            >
              <Icon color={screen === current ? COLOR.BRAND : COLOR.LIGHTEN} value={icon} family={ICON.FAMILY} />
              <Text bold caption color={screen === current ? COLOR.TEXT : COLOR.LIGHTEN} marginTop="S">
                {text}
              </Text>
            </Touchable>
          ))}
        </View>
      </BlurView>
    </Motion>
  );
};

Footer.propTypes = {
  current: PropTypes.string,
  onScreen: PropTypes.func,
  visible: PropTypes.bool,
};

export { Footer };
