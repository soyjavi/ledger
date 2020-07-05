/* eslint-disable react/display-name */
import PropTypes from 'prop-types';

import React, { forwardRef } from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';

import { HEADER_HEIGHT } from '../Header/Header.style';

export const ScrollView = forwardRef(({ children, onScroll, ...others }, ref) => {
  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }) => onScroll(y > HEADER_HEIGHT, y);

  return (
    <ScrollViewBase {...others} onScroll={handleScroll} ref={ref} scrollEventThrottle={40}>
      {children}
    </ScrollViewBase>
  );
});

ScrollView.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func.isRequired,
};
