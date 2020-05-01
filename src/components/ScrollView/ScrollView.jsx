/* eslint-disable react/display-name */
import { node, func } from 'prop-types';
import React, { forwardRef, useState } from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';

import { HEADER_HEIGHT } from '../Header/Header.style';

export const ScrollView = forwardRef(({ children, onScroll, ...others }, ref) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y: next },
    },
  }) => {
    if (next !== scroll) {
      setScroll(next);
      onScroll(next > HEADER_HEIGHT, next);
      // onScroll(next > HEADER_HEIGHT && next >= scroll);
    }
  };

  return (
    <ScrollViewBase onScroll={onScroll ? handleScroll : undefined} ref={ref} scrollEventThrottle={40} {...others}>
      {children}
    </ScrollViewBase>
  );
});

ScrollView.propTypes = {
  children: node,
  onScroll: func,
};
