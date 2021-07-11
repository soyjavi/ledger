import {
  LAYOUT,
  // components
  Notification,
  // hooks
  useStack,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useContext, createContext } from 'react';

import { C } from '@common';

const DEFAULTS = {
  timeoutClose: 10000,
  marginBottom: LAYOUT.XXS,
};

const SnackBarContext = createContext(`${C.NAME}:context:snackbar`);

const useSnackBar = () => useContext(SnackBarContext);

const SnackBarProvider = ({ children }) => {
  const Stack = useStack();

  return (
    <SnackBarContext.Provider
      value={{
        alert: ({ id = new Date().getTime(), text }) => Stack.alert(id, Notification, { text, ...DEFAULTS }),
        success: ({ id = new Date().getTime(), text }) => Stack.success(id, Notification, { text, ...DEFAULTS }),
        info: ({ id = new Date().getTime(), text }) => Stack.info(id, Notification, { text, marginBottom: LAYOUT.XXS }),
        hide: (id) => Stack.hide(id),
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SnackBarProvider, useSnackBar };
