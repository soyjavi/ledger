import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import Transaction from './Transaction';

describe('<Transaction>', () => {
  it('renders', () => {
    const tree = renderer.create(<Transaction />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

