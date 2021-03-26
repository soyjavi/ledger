import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Motion, View } from 'reactor/components';
import { Icon, Text, Touchable } from 'reactor/components';

import { C } from '@common';
import { useL10N, useNavigation } from '@context';

import styles from './Footer.style';

const { SCREEN } = C;
const { BLUR, COLOR, ICON, MOTION, UNIT } = THEME;

const Footer = ({ visible = true }) => {
  const l10n = useL10N();
  const navigation = useNavigation();

  const OPTIONS = [
    //
    { icon: 'home', text: l10n.DASHBOARD, section: SCREEN.DASHBOARD },
    { icon: 'chart', text: l10n.ACTIVITY, section: SCREEN.STATS },
    { icon: 'list', text: l10n.VAULTS, section: SCREEN.VAULTS },
    { icon: 'settings', text: l10n.SETTINGS, section: SCREEN.SETTINGS },
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
          {OPTIONS.map(({ icon, text, section }, index) => (
            <Touchable key={index} style={styles.option} onPress={() => navigation.go(section)}>
              <Icon color={index === 0 ? COLOR.BRAND : COLOR.LIGHTEN} value={icon} family={ICON.FAMILY} />
              <Text bold={index === 0} caption color={index === 0 ? COLOR.TEXT : COLOR.LIGHTEN} marginTop="S">
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
  visible: PropTypes.bool,
};

export { Footer };
