import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { InputOption, Text } from '../../../../reactor/components';
import styles from './OptionItem.style';

class OptionItem extends PureComponent {
  static propTypes = {
    active: bool,
    caption: string,
    onChange: func.isRequired,
    title: string.isRequired,
  };

  static defaultProps = {
    active: true,
    caption: undefined,
  };

  render() {
    const {
      props: {
        active, caption, onChange, title,
      },
    } = this;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text subtitle level={2} numberOfLines={1}>{title}</Text>
          { caption && <Text caption lighten>{caption}</Text> }
        </View>
        <InputOption onChange={onChange} style={styles.switch} value={active} />
      </View>
    );
  }
}

export default OptionItem;
