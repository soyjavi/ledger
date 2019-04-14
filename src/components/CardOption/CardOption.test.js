import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import CardOption from './CardOption';

describe('<CardOption>', () => {
  it('renders', () => {
    const tree = renderer.create(<CardOption />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

