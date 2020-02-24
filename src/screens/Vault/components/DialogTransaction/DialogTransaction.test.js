import React from 'react';
import renderer from 'react-test-renderer';

import DialogTransaction from './DialogTransaction';

describe('<DialogTransaction>', () => {
  it('renders', () => {
    const tree = renderer.create(<DialogTransaction />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
