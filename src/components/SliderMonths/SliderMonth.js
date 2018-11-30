import { arrayOf, string, func } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import { LAYOUT } from '../../reactor/common';
import { Consumer } from '../../context';
import { Slider, Text } from '../../reactor/components';
import styles from './SliderMonth.style';

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
    const { props: { onChange, dataSource }, state } = this;

    if (state.index !== index) onChange(dataSource[index]);
  }

  render() {
    const {
      _onScroll,
      props: { dataSource },
      state: { scrollToItem },
    } = this;

    if (scrollToItem) console.log('<SliderMonth>:scrollToItem', scrollToItem, dataSource);

    return (
      <Consumer>
        { ({ l10n, store: { queryProps: { date } } }) => (
          <View style={styles.container}>
            <Slider
              dataSource={[undefined, ...dataSource, undefined]}
              item={({ data }) => (
                <Text level={2} lighten={data !== date} subtitle={data === date} style={styles.item}>
                  {data}
                </Text>
              )}
              itemMargin={0}
              itemWidth={LAYOUT.VIEWPORT.W / 3}
              onScroll={_onScroll}
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
