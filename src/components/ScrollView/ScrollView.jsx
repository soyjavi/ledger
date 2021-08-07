/* eslint-disable react/display-name */
import {
  Theme,
  LAYOUT,
  // compoennts
  ScrollView as ScrollViewAurora,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Platform } from 'react-native';

import { style } from './ScrollView.style';

const { spaceXXL } = Theme.get();

const ScrollView = forwardRef(({ children, onScroll, ...others }, ref) => {
  const handleScroll = ({ Y }) => onScroll(Y > spaceXXL, Y);

  return (
    <ScrollViewAurora
      {...others}
      keyboardShouldPersistTaps="never"
      ref={ref}
      // ! Should detect if device has notch or not.------------------------------
      paddingTop={Platform.OS === 'web' ? LAYOUT.L : LAYOUT.XXL}
      paddingBottom={LAYOUT.XXL}
      scrollEventThrottle={40}
      style={style.container}
      onScroll={onScroll ? handleScroll : undefined}
    >
      {children}
    </ScrollViewAurora>
  );
});

ScrollView.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
};

export { ScrollView };
