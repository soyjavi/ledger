import {
  bool, func, shape, string,
} from 'prop-types';
import React from 'react';
import { TextInput, View } from 'react-native';

import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Motion } from '../../reactor/components';
import Heading from '../Heading';
import styles from './Header.style';

const { COLOR } = THEME;

const Header = ({
  highlight, left, onSearch, right, title, visible, ...inherit
}) => (
  <Consumer>
    { ({ l10n }) => (
      <View style={[styles.row, styles.container, highlight && styles.highlight, inherit.style]}>
        { left && <Button color={COLOR.TRANSPARENT} {...left} iconSize={24} /> }
        <View style={styles.content}>
          { onSearch && (
            <TextInput
              blurOnSubmit
              onChangeText={onSearch}
              placeholder={`${l10n.SEARCH}...`}
              placeholderTextColor={COLOR.TEXT_LIGHTEN}
              underlineColorAndroid="transparent"
              style={styles.input}
            />
          )}
          { title && (
            <Motion preset="fade" style={styles.row} visible={highlight}>
              <Heading title={title} logo />
            </Motion>
          )}
        </View>
        { right && <Button contained={false} small {...right} /> }
      </View>
    )}
  </Consumer>
);

Header.propTypes = {
  highlight: bool,
  left: shape({}),
  onSearch: func,
  right: shape({}),
  title: string,
  visible: bool,
};

Header.defaultProps = {
  highlight: false,
  left: undefined,
  onSearch: undefined,
  right: undefined,
  title: undefined,
  visible: false,
};

export default Header;
