import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { FlatList, View } from 'react-native';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import { Summary, Footer, Header } from '../../components';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import {
  DialogTransaction, DialogTransfer, GroupTransactions, Search,
} from './components';
import query from './modules/query';
import styles from './Vault.style';

const { TX: { TYPE: { EXPENSE, TRANSFER } } } = C;

class Vault extends Component {
  static propTypes = {
    backward: bool,
    dataSource: shape({}),
    l10n: shape({}).isRequired,
    navigation: shape({}),
    goBack: func,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    dataSource: undefined,
    navigation: undefined,
    goBack() {},
    visible: true,
  };

  state = {
    dialog: false,
    scroll: false,
    search: undefined,
    type: EXPENSE,
    values: [],
  };

  componentWillReceiveProps({
    backward, goBack, dataSource, visible, ...store
  }) {
    const { props: { dataSource: { txs = [] } = {} } } = this;

    if (visible && dataSource && dataSource.txs.length !== txs.length) {
      const search = undefined;
      this.setState({ search, values: query(store, { ...dataSource, search }) });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { visible }, state: { dialog, scroll, search } } = this;

    return (nextProps.visible !== visible)
      || (nextState.dialog !== dialog)
      || (nextState.scroll !== scroll)
      || (nextState.search !== search);
  }

  _onHardwareBack = (navigation) => {
    const { state: { dialog } } = this;
    if (dialog) this.setState({ dialog: false });
    else navigation.goBack();
    return true;
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onSearch = (search) => {
    const { dataSource, ...inherit } = this.props;

    this.setState({
      search,
      values: query(inherit, { ...dataSource, search: search.toLowerCase().trim() }),
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTransactionType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onHardwareBack, _onScroll, _onSearch, _onToggleDialog, _onTransactionType,
      props: { visible, ...props },
      state: {
        dialog, scroll, search, type, values = [],
      },
    } = this;
    const { state: { params: vault = {} } = {} } = props.navigation;
    const { currency, hash } = vault;

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: { vaults },
          }) => (
            <Fragment>
              <Header highlight={scroll} image={FLAGS[currency]} title={vault.title} visible={visible} />

              <FlatList
                contentContainerStyle={styles.container}
                data={visible ? values : []}
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
                    <Search l10n={l10n} onValue={value => _onSearch(value)} value={search} />
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
                onBack={() => navigation.goBack(props.navigation)}
                onHardwareBack={() => _onHardwareBack(navigation)}
                onPress={_onTransactionType}
                options={vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER]}
                visible={visible}
              />
              { visible && (
                <Fragment>
                  <DialogTransaction
                    currency={currency}
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
