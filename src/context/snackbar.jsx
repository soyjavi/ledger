import { node } from 'prop-types';
import React, { useContext, useReducer, createContext } from 'react';

import { C } from '../common';
import { THEME } from '../reactor/common';
import { useL10N } from '../reactor/context/L10N';
import { Snackbar } from '../reactor/components';

const KEY = `${C.NAME}:context:snackbar`;
const SnackBarContext = createContext(KEY);
const { COLOR } = THEME;

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

  const { caption = '', color, type } = state;

  return (
    <SnackBarContext.Provider value={events}>
      {children}
      <Snackbar
        {...state}
        caption={caption}
        color={color}
        icon="cancel"
        button={l10n.CLOSE.toUpperCase()}
        onClose={() => dispatch({ type: 'HIDE' })}
        visible={type === 'SHOW'}
      />
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: node.isRequired,
};

const useSnackBar = () => useContext(SnackBarContext);

export { useSnackBar, SnackBarProvider };
