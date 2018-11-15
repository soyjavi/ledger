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
    switchCurrency: false,
    type: EXPENSE,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;

    if (visible && !props.visible) this.setState({ switchCurrency: false });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTransactionType = type => this.setState({ dialog: type !== undefined, type });

  _onSwitchCurrency = () => {
    const { state: { switchCurrency } } = this;
    this.setState({ switchCurrency: !switchCurrency });
  }

  render() {
    const {
      _onSwitchCurrency, _onToggleDialog, _onTransactionType,
      props: { dataSource: { currency, hash, title }, visible, ...inherit },
      state: { dialog, switchCurrency, type },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: {
              baseCurrency, queryTxs, rates, vaults,
            },
          }) => (
            <Fragment>
              <Header
                left={{ title: l10n.BACK, onPress: () => navigation.goBack() }}
                title={title}
                right={currency !== baseCurrency ? { title: '$switch', onPress: _onSwitchCurrency } : undefined}
                visible={visible}
              />
              <Motion preset="fadeleft" delay={500} visible={visible}>
                <ScrollView style={styles.scroll}>
                  <VaultBalance
                    dataSource={vaults.find(vault => vault.hash === hash)}
                    baseCurrency={switchCurrency ? baseCurrency : undefined}
                    txs={queryTxs}
                  />
                  { queryTxs.map(tx => (
                    <TransactionItem
                      key={tx.hash || tx.timestamp}
                      {...tx}
                      currency={switchCurrency ? baseCurrency : currency}
                      value={switchCurrency && tx.hash ? exchange(tx.value, currency, baseCurrency, rates) : tx.value}
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
