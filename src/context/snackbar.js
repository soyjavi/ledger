import { node } from 'prop-types';
import React, {
  useContext, useEffect, useReducer, useState, createContext,
} from 'react';
import { View } from 'react-native';

import { C } from '../common';
import { useL10N } from '../reactor/context/L10N';

const KEY = `${C.NAME}:context:snackbar`;
const SnackBarContext = createContext(KEY);

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

let Snackbar = View;

const SnackBarProvider = ({ children }) => {
  const l10n = useL10N();
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(reducer, { color: undefined, caption: undefined });

  useEffect(() => {
    // We need delay the component load meanwhile theming is processing
    Snackbar = require('../reactor/components/Snackbar').default;
    setMounted(true);
  }, [mounted]);

  const events = {
    snackbarSuccess: (caption) => dispatch({ type: 'SHOW', caption, color: 'green' }),
    snackbarError: (caption) => dispatch({ type: 'SHOW', caption, color: 'red' }),
    snackbarWarning: (caption) => dispatch({ type: 'SHOW', caption, color: 'orange' }),
  };

  return (
    <SnackBarContext.Provider value={events}>
      <Snackbar
        {...state}
        button={l10n.CLOSE.toUpperCase()}
        onPress={() => dispatch({ type: 'HIDE' })}
        visible={state.caption !== undefined}
      />
      {children}
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: node.isRequired,
};

const useSnackBar = () => useContext(SnackBarContext);

export { useSnackBar, SnackBarProvider };
