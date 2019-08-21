import { node, shape } from 'prop-types';
import React, { PureComponent, createContext } from 'react';

import { C } from '../common';

const { Provider, Consumer: ConsumerNavigation } = createContext(`${C.NAME}:context:navigation`);
const { SCREEN: { SESSION } } = C;

class ProviderNavigation extends PureComponent {
  static propTypes = {
    children: node,
    navigator: shape({}),
  };

  static defaultProps = {
    children: undefined,
    navigator: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { params: {}, stack: [SESSION] };
  }

  get current() {
    const { state: { stack } } = this;

    return stack[stack.length - 1];
  }

  goBack = () => {
    const { props: { navigator }, state: { params, stack } } = this;

    delete params[this.current];
    stack.pop();
    if (stack.length === 0) stack.push(SESSION);
    this.setState({ params, stack });
    this.forceUpdate();
    if (navigator && navigator.goBack) navigator.goBack();
  }

  navigate = (screen, parameters = {}) => {
    const { props: { navigator }, state: { params, stack } } = this;

    if (!stack.includes(screen)) {
      this.setState({ stack: [...stack, screen], params: { ...params, [screen]: parameters } });
      if (navigator) navigator.navigate(screen, parameters);
    }
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
