import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import Session from './Session';

describe('<Session>', () => {
  it('renders', () => {
    const tree = renderer.create(<Session />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
