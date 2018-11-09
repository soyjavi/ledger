import React from 'react';
import renderer from 'react-test-renderer';

import { C } from 'common';
import Summary from './Summary';

describe('<Summary>', () => {
  it('renders', () => {
    const tree = renderer.create(<Summary />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

