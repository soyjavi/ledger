/* eslint-disable react/display-name */
import {
  Theme,
  // compoennts
  ScrollView as ScrollViewAurora,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import { style } from './ScrollView.style';

const { spaceXXL } = Theme.get();

const ScrollView = forwardRef(({ children, onScroll, ...others }, ref) => {
  const handleScroll = ({ Y }) => onScroll(Y > spaceXXL, Y);

  return (
    <ScrollViewAurora
      {...others}
      style={style.container}
      keyboardShouldPersistTaps="never"
      ref={ref}
      scrollEventThrottle={40}
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
