import {
  bool, func, shape, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { TextInput, View } from 'react-native';

import ASSETS from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { Activity, Icon } from '../../../../reactor/components';
import styles from './Search.style';

const { COLOR } = THEME;
let TIMEOUT;

class Search extends PureComponent {
  static propTypes = {
    l10n: shape({}).isRequired,
    nightMode: bool,
    onValue: func.isRequired,
    value: string,
  };

  static defaultProps = {
    nightMode: false,
    value: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      value: props.value,
    };
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
  }

  _onChangeText = (value) => {
    const { props: { onValue } } = this;

    this.setState({ searching: value.length > 0, value });
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => onValue(value), 300);
    setTimeout(() => this.setState({ searching: false }), 1000);
  }

  render() {
    const { _onChangeText, props: { l10n, nightMode }, state: { searching, value } } = this;

    return (
      <View style={styles.container}>
        <Icon value={nightMode ? ASSETS.searchNightMode : ASSETS.search} style={styles.icon} />
        <TextInput
          blurOnSubmit
          onChangeText={_onChangeText}
          placeholder={`${l10n.SEARCH}...`}
          placeholderTextColor={COLOR.TEXT_LIGHTEN}
          underlineColorAndroid="transparent"
          defaultValue={value}
          style={styles.input}
        />
        { searching && <Activity color={COLOR.TEXT_LIGHTEN} /> }
      </View>
    );
  }
}

export default Search;
