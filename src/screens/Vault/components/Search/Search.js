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
    onValue: func.isRequired,
    value: string,
  };

  static defaultProps = {
    value: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
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
    const { _onChangeText, props: { l10n }, state: { focus, searching, value } } = this;

    return (
      <View style={[styles.container, focus && styles.focus]}>
        <Icon value={ASSETS.search} style={styles.icon} />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit
          onBlur={() => this.setState({ focus: false })}
          onChangeText={_onChangeText}
          onFocus={() => this.setState({ focus: true })}
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
