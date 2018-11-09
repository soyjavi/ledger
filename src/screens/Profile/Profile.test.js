import React from 'react';
import renderer from 'react-test-renderer';

import { C } from 'common';
import Profile from './Profile';

describe('<Profile>', () => {
  it('renders', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

