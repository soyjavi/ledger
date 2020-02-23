import React from 'react';
import renderer from 'react-test-renderer';

import { C } from '../../common';
import HorizontalChartItem from './HorizontalChartItem';

describe('<HorizontalChartItem>', () => {
  it('renders', () => {
    const tree = renderer.create(<HorizontalChartItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('when {...}', () => {
  // });
});
