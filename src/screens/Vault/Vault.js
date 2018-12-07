import { bool, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { Image, ScrollView, View } from 'react-native';

import { bannerEmpty, iconBack, iconShuffle } from '../../assets';
import { C, exchange } from '../../common';
import {
  DialogClone, DialogTransaction, DialogTransfer, FloatingButton, TransactionItem, VaultBalance,
} from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Vault.style';

const { TX: { TYPE: { EXPENSE, TRANSFER } } } = C;

class Vault extends Component {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  state = {
    clone: undefined,
    dialog: false,
    switchCurrency: false,
    type: EXPENSE,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;

    if (visible && !props.visible) this.setState({ switchCurrency: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props: { visible },
      state: { clone, dialog, switchCurrency },
    } = this;

    return (nextProps.visible !== visible)
      || (nextState.clone !== clone)
      || (nextState.dialog !== dialog)
      || (nextState.switchCurrency !== switchCurrency);
  }

  _onToggleClone = clone => this.setState({ clone });

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
      _onSwitchCurrency, _onToggleClone, _onToggleDialog, _onTransactionType,
      props: {
        dataSource: { currency, hash, title },
        visible,
        ...inherit
      },
      state: {
        clone, dialog, switchCurrency, type,
      },
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
                left={{ icon: iconBack, onPress: () => navigation.goBack() }}
                right={currency !== baseCurrency ? { icon: iconShuffle, onPress: _onSwitchCurrency } : undefined}
                visible={visible}
              />
              <VaultBalance
                dataSource={vaults.find(vault => vault.hash === hash)}
                baseCurrency={switchCurrency ? baseCurrency : undefined}
                txs={visible ? queryTxs : []}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                { queryTxs.length > 0
                  ? queryTxs.map(tx => (
                    <TransactionItem
                      key={tx.hash || tx.timestamp}
                      {...tx}
                      currency={switchCurrency ? baseCurrency : currency}
                      cashflow={switchCurrency && tx.cashflow
                        ? {
                          incomes: exchange(tx.cashflow.incomes, currency, baseCurrency, rates),
                          expenses: exchange(tx.cashflow.expenses, currency, baseCurrency, rates),
                        }
                        : tx.cashflow}
                      onClone={() => _onToggleClone(tx)}
                      value={switchCurrency && tx.hash ? exchange(tx.value, currency, baseCurrency, rates) : tx.value}
                    />))
                  : (
                    <View style={styles.content}>
                      <Image source={bannerEmpty} resizeMode="contain" style={styles.banner} />
                      <Text level={2} lighten>{l10n.VAULT_EMPTY}</Text>
                    </View>)
                }
              </ScrollView>
              <FloatingButton
                onPress={dialog ? _onToggleDialog : _onTransactionType}
                options={vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER]}
                visible={!dialog && !inherit.backward}
              />
              { visible && (
                <Fragment>
                  <DialogTransaction
                    type={type}
                    vault={hash}
                    onClose={_onToggleDialog}
                    visible={dialog && type !== TRANSFER}
                  />
                  { vaults.length > 1 && (
                    <DialogTransfer vault={hash} onClose={_onToggleDialog} visible={dialog && type === TRANSFER} />)}
                  <DialogClone dataSource={clone} visible={!!clone} onClose={() => _onToggleClone()} />
                </Fragment>)}
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Vault;
