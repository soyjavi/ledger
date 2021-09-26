import {
  // helpers
  DISPLAY,
  POINTER,
  SIZE,
  // components
  Motion,
  // hooks
  usePortal,
} from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import { MOTION } from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { ROUTE } from '@common';

import { style } from './Viewport.style';

const getRootPath = (path = '') => `/${path.split('/')[1]}`;

export const Viewport = ({ children, path, stackMode = true }) => {
  const { route = {}, history = [] } = useRouter();
  const { busy: busyPortal } = usePortal();
  const { width } = useWindowDimensions();

  const rootPath = getRootPath(path);

  let visible = stackMode ? route.path.includes(rootPath) : path.includes(route.params.tab);
  const behind = !visible && history.find((route) => route.path.includes(rootPath)) !== undefined;
  const backward = behind && history[history.length - 2] && !history[history.length - 2].path.includes(rootPath);

  // * This is a workaround ----------------------------------------------------
  if (behind && !backward && !stackMode) {
    const [{ path: lastPath } = {}] = history.slice(-1);
    const lastRootPath = getRootPath(lastPath);
    if (lastRootPath === ROUTE.VAULT) visible = true;
  }
  // * -------------------------------------------------------------------------

  // eslint-disable-next-line no-console
  console.log(visible ? '🟢' : backward ? '🔴' : behind ? '🟠' : '⚫️', path);

  return stackMode ? (
    <Motion
      disabled={backward}
      delay={backward}
      duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
      layer={visible ? SIZE.S : behind || backward ? SIZE.XS : SIZE.M}
      pointerEvents={!visible ? POINTER.NONE : undefined}
      style={style.container}
      value={{
        opacity: behind ? 0.5 : backward ? 0 : 1,
        scale: behind || (visible && busyPortal) ? 0.95 : 1,
        translateX: visible || behind ? 0 : backward ? -width : width,
      }}
    >
      {!backward ? children : undefined}
    </Motion>
  ) : (
    <Motion
      display={!visible ? DISPLAY.NONE : undefined}
      pointerEvents={!visible ? POINTER.NONE : undefined}
      value={{
        opacity: visible ? 1 : 0,
        translateY: visible ? 0 : 16,
      }}
    >
      {children}
    </Motion>
  );
};

Viewport.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  stackMode: PropTypes.bool,
};
