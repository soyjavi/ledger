import { func, shape, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

import { THEME } from '../../../../reactor/common';
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
    this.state = { value: props.value };
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
  }

  _onChangeText = (value) => {
    const { props: { onValue } } = this;

    this.setState({ value });
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => onValue(value), 300);
  }

  render() {
    const { _onChangeText, props: { l10n }, state: { value } } = this;

    return (
      <TextInput
        blurOnSubmit
        onChangeText={_onChangeText}
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.TEXT_LIGHTEN}
        underlineColorAndroid="transparent"
        defaultValue={value}
        style={styles.input}
      />
    );
  }
}

export default Search;
