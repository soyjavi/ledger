import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../../../common';
import DialogFork from './DialogFork';

describe('<DialogFork>', () => {
  it('renders', () => {
    const tree = renderer.create(<DialogFork />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
