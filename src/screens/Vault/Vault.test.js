import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import Vault from './Vault';

describe('<Vault>', () => {
  it('renders', () => {
    const tree = renderer.create(<Vault />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

