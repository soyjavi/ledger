import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import DialogTransfer from './DialogTransfer';

describe('<DialogTransfer>', () => {
  it('renders', () => {
    const tree = renderer.create(<DialogTransfer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});

