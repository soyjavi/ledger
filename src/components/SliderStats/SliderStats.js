import {
  arrayOf, func, shape, string,
} from 'prop-types';
import React, { Fragment } from 'react';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Slider } from '../../reactor/components';
import HeadingItem from '../HeadingItem';
import StatItem from '../StatItem';
import styles from './SliderStats.style';

const { SLIDER, TX: { TYPE } } = C;

const SliderStats = ({ dataSource, onItem, type }) => (
  <Consumer>
    { ({ l10n }) => (
      <Fragment>
        <HeadingItem
          title={`${l10n.MONTHS[(new Date()).getMonth()]}'s ${type === TYPE.INCOME ? l10n.INCOMES : l10n.EXPENSES}`}
        />
        <Slider
          {...SLIDER}
          dataSource={dataSource}
          item={({ data }) => <StatItem onPress={() => onItem(data)} type={type} {...data} />}
          style={styles.container}
        />
      </Fragment>
    )}
  </Consumer>
);

SliderStats.propTypes = {
  dataSource: arrayOf(shape({})).isRequired,
  onItem: func.isRequired,
  type: string.isRequired,
};

export default SliderStats;
