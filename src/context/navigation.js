import { node } from 'prop-types';
import React, { PureComponent, createContext } from 'react';

import { C } from 'common';

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
    error: undefined,
    stack: [SESSION],
    parameters: undefined,
  }

  get current() {
    const { state: { stack } } = this;

    return stack[stack.length - 1];
  }

  goBack = () => {
    const { state: { stack } } = this;

    stack.pop();
    if (stack.length === 0) stack.push(SESSION);
    this.setState({ stack, parameters: undefined });
    this.forceUpdate();
  }

  navigate = (screen, parameters) => {
    const { state: { stack } } = this;

    this.setState({ stack: [...stack, screen], parameters });
  }

  onError = error => this.setState({ error })

  render() {
    const {
      current, goBack, navigate, onError,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          current, goBack, navigate, onError, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerNavigation, ProviderNavigation };
