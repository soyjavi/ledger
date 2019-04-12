import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { BackHandler, FlatList, View } from 'react-native';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import { Summary, Footer, Header } from '../../components';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import {
  DialogTransaction, DialogTransfer, GroupTransactions, Search,
} from './components';
import styles from './Vault.style';

const { TX: { TYPE: { EXPENSE, TRANSFER } } } = C;

class Vault extends Component {
  static propTypes = {
    backward: bool,
    navigation: shape({}),
    goBack: func,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    navigation: undefined,
    goBack() {},
    visible: true,
  };

  state = {
    dialog: false,
    scroll: false,
    search: undefined,
    type: EXPENSE,
  };

  componentWillReceiveProps({ backward, goBack }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      const { props: { navigation }, state: { dialog } } = this;

      if (dialog) this.setState({ dialog: false });
      else goBack(navigation);
      return true;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props: { visible },
      state: { dialog, scroll, search },
    } = this;

    return (nextProps.visible !== visible)
      || (nextState.dialog !== dialog)
      || (nextState.scroll !== scroll)
      || (nextState.search !== search);
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onSearch = ({ value, store: { query }, l10n }) => {
    const { navigation: { state: { params: { hash: vault } } } } = this.props;

    this.setState({ search: value });
    query({
      l10n, method: 'groupByDay', search: value.toLowerCase().trim(), vault,
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTransactionType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onScroll, _onSearch, _onToggleDialog, _onTransactionType,
      props: { visible, ...props },
      state: {
        dialog, scroll, search, type,
      },
    } = this;
    const { state: { params: vault = {} } = {} } = props.navigation;
    const { currency, currentBalance, hash } = vault;

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: { queryTxs, vaults, ...store },
          }) => (
            <Fragment>
              <Header
                amount={{ currency, value: currentBalance }}
                highlight={scroll}
                image={FLAGS[currency]}
                title={vault.title}
                visible={visible}
              />

              <FlatList
                contentContainerStyle={styles.container}
                data={visible ? queryTxs : []}
                keyExtractor={tx => `${tx.timestamp}-${tx.value}`}
                onScroll={_onScroll}
                scrollEventThrottle={40}
                ListHeaderComponent={() => (
                  <Fragment>
                    <Summary
                      {...vaults.find(row => row.hash === hash)}
                      image={FLAGS[currency]}
                      title={`${vault.title} ${l10n.BALANCE}`}
                    />
                    <Search l10n={l10n} onValue={value => _onSearch({ value, store, l10n })} value={search} />
                  </Fragment>
                )}
                ListEmptyComponent={() => (
                  <View style={[styles.content, styles.container]}>
                    <Text level={2} lighten>{l10n.VAULT_EMPTY}</Text>
                  </View>
                )}
                renderItem={({ item }) => <GroupTransactions {...item} currency={currency} />}
              />

              <Footer
                onPress={_onTransactionType}
                onBack={() => navigation.goBack(props.navigation)}
                options={vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER]}
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
                </Fragment>
              )}
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Vault;
