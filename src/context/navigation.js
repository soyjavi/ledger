import { node, shape } from 'prop-types';
import React, { useContext, useState, createContext } from 'react';

import { C } from '../common';

const { SCREEN: { SESSION } } = C;
const NavigationContext = createContext(`${C.NAME}:context:navigation`);

const NavigationProvider = ({ children, navigator }) => {
  const [params, setParams] = useState({});
  const [stack, setStack] = useState([SESSION]);
  const [, setState] = useState();

  const goBack = () => {
    delete params[stack[stack.length - 1]];
    stack.pop();
    if (stack.length === 0) stack.push(SESSION);

    setParams(params);
    setStack(stack);
    if (navigator && navigator.goBack) navigator.goBack();
    setState({});
  };

  const navigate = (screen, parameters = {}) => {
    if (!stack.includes(screen)) {
      setParams({ ...params, [screen]: parameters });
      setStack([...stack, screen]);
      if (navigator) navigator.navigate(screen, parameters);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        current: stack[stack.length - 1],
        goBack,
        navigate,
        params,
        stack,
      }}
    >
      { children }
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: node,
  navigator: shape({}),
};

NavigationProvider.defaultProps = {
  children: undefined,
  navigator: undefined,
};

export { NavigationProvider };

export const useNavigation = () => useContext(NavigationContext);
