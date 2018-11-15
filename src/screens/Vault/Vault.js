import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { C, exchange } from '../../common';
import {
  DialogTransaction, FloatingButton, TransactionItem, VaultBalance,
} from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Motion, Viewport } from '../../reactor/components';
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
    baseCurrency: false,
    type: EXPENSE,
  };

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTransactionType = type => this.setState({ dialog: type !== undefined, type });

  _onSwitchCurrency = () => {
    const { state: { baseCurrency } } = this;
    this.setState({ baseCurrency: !baseCurrency });
  }

  render() {
    const {
      _onSwitchCurrency, _onToggleDialog, _onTransactionType,
      props: { dataSource: { currency, hash, title }, visible, ...inherit },
      state: { dialog, baseCurrency, type },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: {
              currency: base, queryTxs, rates, vaults,
            },
          }) => (
            <Fragment>
              <Header
                left={{ title: l10n.BACK, onPress: () => navigation.goBack() }}
                title={title}
                right={currency !== base ? { title: '$switch', onPress: _onSwitchCurrency } : undefined}
                visible={visible}
              />
              <Motion preset="fadeleft" delay={500} visible={visible}>
                <ScrollView style={styles.scroll}>
                  <VaultBalance
                    dataSource={vaults.find(vault => vault.hash === hash)}
                    baseCurrency={baseCurrency ? base : undefined}
                    txs={queryTxs}
                  />
                  { queryTxs.map(tx => (
                    <TransactionItem
                      key={tx.hash || tx.timestamp}
                      {...tx}
                      currency={baseCurrency ? base : currency}
                      value={baseCurrency && tx.hash ? exchange(tx.value, currency, base, rates) : tx.value}
                    />))}
                </ScrollView>
              </Motion>

              <FloatingButton
                onPress={dialog ? _onToggleDialog : _onTransactionType}
                options={l10n.TYPE_TRANSACTION}
                visible={!dialog && !inherit.backward}
              />
              { visible && <DialogTransaction type={type} vault={hash} onClose={_onToggleDialog} visible={dialog} />}
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Vault;
