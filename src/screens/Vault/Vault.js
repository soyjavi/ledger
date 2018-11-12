import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { C } from 'common';
import {
  DialogTransaction, FloatingButton, TransactionItem, VaultBalance,
} from 'components';
import { Header } from 'containers';
import { Consumer } from 'context';
import {
  Viewport,
} from 'reactor/components';
import styles from './Vault.style';

const { TX: { TYPE: { EXPENSE } } } = C;

class Vault extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  state = {
    dialog: false,
    type: EXPENSE,
  };

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onToggleDialog, _onType,
      props: { dataSource, visible, ...inherit },
      state: { dialog, type },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { }
        <Consumer>
          { ({ navigation, l10n, store: { queryTxs } }) => (
            <Fragment>
              <Header
                left={{ title: l10n.BACK, onPress: () => navigation.goBack() }}
                title={dataSource.title}
                right={{ title: l10n.SEARCH }}
                visible={visible}
              />
              <ScrollView style={styles.scroll}>
                <View />
                <VaultBalance dataSource={dataSource} txs={queryTxs} />
                { queryTxs.map(tx => <TransactionItem key={tx.hash || tx.timestamp} {...tx} />)}
              </ScrollView>

              <FloatingButton
                onPress={dialog ? _onToggleDialog : _onType}
                options={l10n.TYPE_TRANSACTION}
                visible={!dialog && !inherit.backward}
              />
              { visible && (
                <DialogTransaction type={type} vault={dataSource.hash} onClose={_onToggleDialog} visible={dialog} /> )}
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Vault;
