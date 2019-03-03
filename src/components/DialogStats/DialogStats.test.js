import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import DialogVault from './DialogVault';

describe('<DialogVault>', () => {
  it('renders', () => {
    const tree = renderer.create(<DialogVault />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

