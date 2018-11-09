import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Header } from 'containers';
import { C } from 'common';
import { Banner, TransactionItem } from 'components';
import { ConsumerNavigation, ConsumerStore } from 'context';
import { Viewport } from 'reactor/components';
import styles from './Summary.style';

const { SCREEN } = C;

class Summary extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
  };

  render() {
    const {
      props: { visible, ...inherit },
      state: { busy },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <ConsumerNavigation>
          { ({ navigate }) => (
            <Header
              busy={busy}
              left={{ title: '$profile', onPress: () => navigate(SCREEN.PROFILE) }}
              title="$List"
              right={{ title: '$new', onPress: () => navigate(SCREEN.TRANSACTION) }}
              visible
            />
          )}
        </ConsumerNavigation>

        <ConsumerStore>
          { ({ txs = [] }) => (
            <ScrollView style={styles.scroll}>
              <Banner title="today" />
              { txs.map(tx => <TransactionItem key={tx.hash} {...tx} />)}
            </ScrollView>
          )}
        </ConsumerStore>

      </Viewport>
    );
  }
}

export default Summary;
