import PropTypes from 'prop-types';
import React, { useContext, useMemo, useReducer, createContext } from 'react';

import { C } from '@common';

const {
  SCREEN: { ONBOARDING },
} = C;
const NavigationContext = createContext(`${C.NAME}:context:navigation`);
const INITIAL_STATE = {
  params: {},
  stack: [ONBOARDING],
  tx: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GO':
      return state.stack.includes(action.value)
        ? state
        : {
            stack: [...state.stack, action.value],
            params: { ...state.params, [action.value]: action.params },
          };

    case 'BACK': {
      const current = state.stack[state.stack.length - 1];

      return {
        stack: state.stack.slice(0, -1),
        params: { ...state.params, [current]: undefined },
      };
    }

    case 'TX': {
      return { ...state, tx: action.value };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return useMemo(
    () => (
      <NavigationContext.Provider
        value={{
          ...state,
          back: () => dispatch({ type: 'BACK' }),
          current: state.stack[state.stack.length - 1],
          go: (value, params = {}) => dispatch({ type: 'GO', value, params }),
          showTx: (value) => dispatch({ type: 'TX', value }),
        }}
      >
        {children}
      </NavigationContext.Provider>
    ),
    [children, state],
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node,
};

const useNavigation = () => useContext(NavigationContext);

export { useNavigation, NavigationProvider };
