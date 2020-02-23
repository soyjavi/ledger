import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import Dashboard from './Dashboard';

describe('<Dashboard>', () => {
  it('renders', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
