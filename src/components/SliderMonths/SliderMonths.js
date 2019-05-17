import { number, func } from 'prop-types';
import React, { createRef, Component } from 'react';

import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Text, Touchable, Slider } from '../../reactor/components';
import styles, { ITEM_WIDTH } from './SliderMonths.style';
import getLastMonths from './modules/getLastMonths';

const { COLOR } = THEME;

class SliderMonths extends Component {
  static propTypes = {
    index: number,
    month: number,
    onChange: func,
    year: number,
  };

  static defaultProps = {
    index: 11,
    month: 0,
    onChange: undefined,
    year: 0,
  };

  constructor(props) {
    super(props);
    this.slider = createRef();
  }

  componentDidMount() {
    const { _scrollTo, props: { index } } = this;
    _scrollTo(index, false);
  }

  componentWillReceiveProps({ index }) {
    const { _scrollTo } = this;
    _scrollTo(index);
  }

  _scrollTo = (index, animated = true) => {
    const { slider: { current: { scrollview } } } = this;
    scrollview.current.scrollTo({ x: (index - 1) * ITEM_WIDTH, animated });
  }

  _onPress = (item) => {
    const { props: { onChange } } = this;
    onChange(item);
  }

  render() {
    const { _onPress, props: { index, ...inherit } } = this;

    return (
      <Consumer>
        { ({ l10n }) => (
          <Slider
            ref={this.slider}
            itemWidth={ITEM_WIDTH}
            itemMargin={0}
            style={[styles.container, inherit.style]}
          >
            { getLastMonths(l10n.MONTHS).map(({ month, year }, i) => (
              <Touchable
                key={month}
                onPress={() => _onPress({ index: i, month, year })}
                rippleColor={COLOR.WHITE}
                style={styles.item}
              >
                <Text subtitle={i === index} level={i === index ? 3 : 2} lighten={i !== index}>
                  {`${l10n.MONTHS[month]} ${year}`}
                </Text>
              </Touchable>
            ))}
          </Slider>
        )}
      </Consumer>
    );
  }
}

export default SliderMonths;
