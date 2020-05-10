import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '@common';

import Option from './Option';

describe('<Option>', () => {
  it('renders', () => {
    const tree = renderer.create(<Option />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
