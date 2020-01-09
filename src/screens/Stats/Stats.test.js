import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import Stats from './Stats';

describe('<Stats>', () => {
  it('renders', () => {
    const tree = renderer.create(<Stats />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
