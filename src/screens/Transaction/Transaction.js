import { bool, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { iconBack } from '../../assets';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Transaction.style';

class Transaction extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: undefined,
    visible: false,
  };

  render() {
    const {
      props: { dataSource: { hash } = {}, visible, ...inherit },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n }) => (
            <Header
              left={{ icon: iconBack, onPress: () => navigation.goBack() }}
              title={l10n.TRANSACTION}
              visible={visible}
            />
          )}
        </Consumer>

        <ScrollView style={styles.scroll}>
          <Text>{hash}</Text>
        </ScrollView>
      </Viewport>
    );
  }
}

export default Transaction;
