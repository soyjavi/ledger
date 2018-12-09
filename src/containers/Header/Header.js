import {
  bool, func, shape, string,
} from 'prop-types';
import React from 'react';
import { TextInput, View } from 'react-native';

import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Text } from '../../reactor/components';
import styles from './Header.style';

const { COLOR } = THEME;

const Header = ({
  highlight, left = {}, onSearch, right = {}, title, visible, ...inherit
}) => (
  <Consumer>
    { ({ l10n }) => (
      <View style={[styles.container, inherit.style]}>
        <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...left} iconSize={24} />
        <View style={styles.content}>
          { onSearch && (
            <TextInput
              blurOnSubmit
              onChangeText={onSearch}
              placeholder={`${l10n.SEARCH}...`}
              placeholderTextColor={COLOR.TEXT_LIGHTEN}
              underlineColorAndroid="transparent"
              style={styles.input}
            />)}
          { title && (
            <Text headline level={5} color={highlight ? COLOR.WHITE : undefined} numberOfLines={1} style={styles.title}>
              { title }
            </Text>)}
        </View>
        <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...right} iconSize={24} />
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
