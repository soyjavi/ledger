import { arrayOf, string, func } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../context';
import { Slider, Text } from '../../reactor/components';
import parseDate from './modules/parseDate';
import styles, { ITEM_WIDTH } from './SliderMonth.style';

class SliderMonth extends Component {
  static propTypes = {
    dataSource: arrayOf(string),
    onChange: func,
  };

  static defaultProps = {
    dataSource: [],
    onChange: undefined,
  };

  state = {
    scrollToItem: undefined,
  };

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    this.setState({
      scrollToItem: nextProps.onChange && props.onChange === undefined
        ? nextProps.dataSource.length
        : undefined,
    });
  }

  _onScroll = ({ index }) => {
    const { props: { onChange, dataSource } } = this;
    onChange(dataSource[index]);
  }

  render() {
    const {
      // _onScroll,
      props: { dataSource, onChange },
      state: { scrollToItem },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store: { queryProps: { date } } }) => (
          <View style={styles.container}>
            <Slider
              dataSource={[undefined, ...dataSource, undefined]}
              item={({ data }) => (
                <Text level={data === date ? 2 : 3} lighten subtitle={data === date} style={styles.item}>
                  {parseDate(data, l10n)}
                </Text>
              )}
              itemMargin={0}
              itemWidth={ITEM_WIDTH}
              onScroll={({ index }) => onChange(dataSource[index])}
              scrollToItem={scrollToItem}
              momentum
              navigation={false}
            />
          </View>
        )}
      </Consumer>
    );
  }
}

export default SliderMonth;
