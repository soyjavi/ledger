import { node } from 'prop-types';
import React, { useContext, useReducer, createContext } from 'react';

import { C, theme } from '../common';
import { useL10N } from '../reactor/context/L10N';
import { Snackbar } from '../reactor/components';

const KEY = `${C.NAME}:context:snackbar`;
const SnackBarContext = createContext(KEY);
const { COLOR } = theme;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { caption: action.caption, color: action.color };

    case 'HIDE':
      return { ...state, caption: undefined };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SnackBarProvider = ({ children }) => {
  const l10n = useL10N();
  const [state, dispatch] = useReducer(reducer, { color: undefined, caption: undefined });

  const events = {
    snackbarSuccess: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.SUCCESS }),
    snackbarError: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.ERROR }),
    snackbarWarning: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.WARNING }),
  };

  return (
    <SnackBarContext.Provider value={events}>
      {children}
      <Snackbar
        {...state}
        button={l10n.CLOSE.toUpperCase()}
        onPress={() => dispatch({ type: 'HIDE' })}
        visible={state.caption !== undefined}
      />
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: node.isRequired,
};

const useSnackBar = () => useContext(SnackBarContext);

export { useSnackBar, SnackBarProvider };
