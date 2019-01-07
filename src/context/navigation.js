import { node } from 'prop-types';
import React, { PureComponent, createContext } from 'react';

import { C } from '../common';

const KEY = `${C.NAME}:context:navigation`;
const { Provider, Consumer: ConsumerNavigation } = createContext(KEY);
const { SCREEN: { SESSION } } = C;

class ProviderNavigation extends PureComponent {
  static propTypes = {
    children: node,
  };

  static defaultProps = {
    children: undefined,
  };

  state = {
    params: {},
    stack: [SESSION],
  }

  get current() {
    const { state: { stack } } = this;

    return stack[stack.length - 1];
  }

  goBack = (navigator) => {
    const { state: { stack } } = this;

    stack.pop();
    if (stack.length === 0) stack.push(SESSION);
    this.setState({ stack });
    this.forceUpdate();
    if (navigator && navigator.goBack) navigator.goBack();
  }

  navigate = (screen, parameters = {}, navigator) => {
    const { state: { params, stack } } = this;

    this.setState({ stack: [...stack, screen], params: { ...params, [screen]: parameters } });

    if (navigator) navigator.navigate(screen, parameters);
  }

  render() {
    const {
      current, goBack, navigate,
      props: { children },
      state: { params, stack },
    } = this;

    return (
      <Provider
        value={{
          current, goBack, navigate, params, stack,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerNavigation, ProviderNavigation };
