import { node } from 'prop-types';

import React, { useContext, useReducer, createContext } from 'react';
import { THEME } from 'reactor/common';
import { Snackbar } from 'reactor/components';
import { useL10N } from 'reactor/context/L10N';

import { C } from '@common';

const KEY = `${C.NAME}:context:snackbar`;
const SnackBarContext = createContext(KEY);
const { COLOR, ICON, SNACKBAR, SPACE } = THEME;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action;

    case 'HIDE':
      return { ...state, caption: undefined, type: 'HIDE' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SnackBarProvider = ({ children }) => {
  const l10n = useL10N();
  const [state, dispatch] = useReducer(reducer, { color: undefined, caption: undefined });

  const events = {
    error: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.ERROR, icon: 'ban' }),
    success: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.BRAND, icon: 'check' }),
    warning: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.CTA, icon: 'info' }),
  };

  return (
    <SnackBarContext.Provider value={events}>
      {children}
      <Snackbar
        {...state}
        button={l10n.CLOSE.toUpperCase()}
        iconSize={SPACE.M}
        family={ICON.FAMILY}
        onClose={() => dispatch({ type: 'HIDE' })}
        position="top"
        style={SNACKBAR}
        visible={state.type === 'SHOW'}
      />
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: node.isRequired,
};

const useSnackBar = () => useContext(SnackBarContext);

export { useSnackBar, SnackBarProvider };
