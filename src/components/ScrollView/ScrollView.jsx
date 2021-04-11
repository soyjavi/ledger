/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';
import { THEME } from 'reactor/common';

import style from './ScrollView.style';

const { SPACE } = THEME;

const ScrollView = forwardRef(({ children, onScroll, ...others }, ref) => {
  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }) => onScroll(y > SPACE.XXL, y);

  return (
    <ScrollViewBase
      {...others}
      contentContainerStyle={style.container}
      keyboardShouldPersistTaps="never"
      ref={ref}
      scrollEventThrottle={40}
      onScroll={onScroll ? handleScroll : undefined}
    >
      {children}
    </ScrollViewBase>
  );
});

ScrollView.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
};

export { ScrollView };
