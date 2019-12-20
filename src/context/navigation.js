import { node } from 'prop-types';
import React, { useContext, useReducer, createContext } from 'react';

import { C } from '../common';

const { SCREEN: { SESSION } } = C;
const NavigationContext = createContext(`${C.NAME}:context:navigation`);

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

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { params: {}, stack: [SESSION] });

  return (
    <NavigationContext.Provider
      value={{
        ...state,
        current: state.stack[state.stack.length - 1],
        back: () => dispatch({ type: 'BACK' }),
        go: (value, params = {}) => dispatch({ type: 'GO', value, params }),
      }}
    >
      { children }
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: node,
};

NavigationProvider.defaultProps = {
  children: undefined,
};

export { NavigationProvider };

export const useNavigation = () => useContext(NavigationContext);
