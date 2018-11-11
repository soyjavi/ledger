import { bool, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Header } from 'containers';
import { Consumer } from 'context';
import { Text, Viewport } from 'reactor/components';
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

  // @TODO: Handle ShouldComponentUpdate()

  render() {
    const {
      props: { dataSource: { hash } = {}, visible, ...inherit },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n }) => (
            <Header
              left={{ title: '$back', onPress: () => navigation.goBack() }}
              title={l10n.TRANSACTION}
              right={{ title: '$clone' }}
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
