import { Motion, POINTER } from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import { MOTION } from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { style } from './Viewport.style';

export const Viewport = ({ children, mode = 'stack', path }) => {
  const { route = {}, history = [] } = useRouter();
  const { width } = useWindowDimensions();

  const stackMode = mode === 'stack';
  const rootPath = `/${path.split('/')[1]}`;

  const visible = stackMode ? route.path.includes(rootPath) : path.includes(route.params.tab);
  const behind = !visible && history.find((route) => route.path.includes(rootPath)) !== undefined;
  const backward = behind && !history[history.length - 2].path.includes(rootPath);

  console.log(visible ? '🟢' : backward ? '🔴' : behind ? '🟠' : '⚫️', path);

  return stackMode ? (
    <Motion
      duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
      pointerEvents={!visible ? POINTER.NONE : undefined}
      style={style.container}
      value={{
        // opacity: behind ? 0.25 : 1,
        scale: behind ? 0.95 : 1,
        translateX: visible ? 0 : behind ? 0 : width,
        // translateX: visible ? 0 : behind ? -16 : width,
      }}
    >
      {children}
    </Motion>
  ) : visible ? (
    children
  ) : (
    <></>
  );
};

Viewport.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['stack', 'tab']),
};
