import { node, func } from 'prop-types';
import React, { useState } from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';

import { HEADER_HEIGHT } from '../';

export const ScrollView = ({ children, onScroll, ...others }) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y: next },
    },
  }) => {
    if (next !== scroll) {
      setScroll(next);
      onScroll(next > HEADER_HEIGHT && next >= scroll);
    }
  };

  return (
    <ScrollViewBase onScroll={handleScroll} scrollEventThrottle={40} {...others}>
      {children}
    </ScrollViewBase>
  );
};

ScrollView.propTypes = {
  children: node,
  onScroll: func,
};
