import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import DialogClone from './DialogClone';

describe('<DialogClone>', () => {
  it('renders', () => {
    const tree = renderer.create(<DialogClone />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
