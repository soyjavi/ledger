import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import { Summary, Footer, Header } from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';
import {
  DialogTransaction, DialogTransfer, GroupTransactions, Search,
} from './components';
import query from './modules/query';
import styles from './Vault.style';

const { SETTINGS: { NIGHT_MODE }, TX: { TYPE: { EXPENSE, TRANSFER } } } = C;
const { SPACE } = THEME;

class Vault extends Component {
  static propTypes = {
    backward: bool,
    dataSource: shape({}),
    goBack: func,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    dataSource: undefined,
    goBack() {},
    visible: true,
  };

  state = {
    dialog: false,
    scroll: false,
    scrollQuery: false,
    search: undefined,
    type: EXPENSE,
    values: [],
  };

  componentWillReceiveProps({ dataSource, visible, ...store }) {
    const { props: { dataSource: { txs = [] } = {} } } = this;

    if (visible && dataSource && dataSource.txs.length !== txs.length) {
      const search = undefined;
      this.setState({ scrollQuery: false, search, values: query(store, { ...dataSource, search }) });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props: { visible },
      state: {
        dialog, scroll, search, scrollQuery,
      },
    } = this;

    return (nextProps.visible !== visible)
      || (nextState.dialog !== dialog)
      || (nextState.scroll !== scroll)
      || (nextState.search !== search)
      || (nextState.scrollQuery !== scrollQuery);
  }

  _onHardwareBack = (navigation) => {
    const { state: { dialog } } = this;
    if (dialog) this.setState({ dialog: false });
    else navigation.goBack();
    return true;
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { props: { dataSource, ...store }, state: { search, ...state } } = this;
    const scroll = y > SPACE.MEDIUM;
    if (scroll !== state.scroll) this.setState({ scroll });

    if (y > SPACE.XXL && !state.scrollQuery) {
      const scrollQuery = true;
      this.setState({ scrollQuery, values: query(store, { ...dataSource, search }, scrollQuery) });
    }
  }

  _onSearch = (search) => {
    const { props: { dataSource, ...inherit }, state: { scrollQuery } } = this;

    this.setState({
      search,
      values: query(inherit, { ...dataSource, search: search.toLowerCase().trim() }, scrollQuery),
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTxType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onHardwareBack, _onScroll, _onSearch, _onToggleDialog, _onTxType,
      props: { dataSource: vault = {}, visible, ...props },
      state: {
        dialog, scroll, search, type, values = [],
      },
    } = this;
    const { currency, hash, title } = vault;

    console.log('<Vault>', {
      visible, dialog, scroll, search,
    });

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n, store: { settings, vaults } }) => (
            <Fragment>
              <Header highlight={scroll} image={FLAGS[currency]} title={title} />
              <ScrollView onScroll={_onScroll} scrollEventThrottle={40} style={styles.container}>
                <Fragment>
                  <Summary {...vault} image={FLAGS[currency]} title={`${title} ${l10n.BALANCE}`} />
                  <Search l10n={l10n} onValue={_onSearch} value={search} />
                </Fragment>
                { visible && values.length > 0
                  ? (
                    <View>
                      { values.map(item => <GroupTransactions key={item.timestamp} {...item} currency={currency} />) }
                    </View>
                  )
                  : (
                    <View style={[styles.content, styles.container]}>
                      <Text level={2} lighten>{l10n.VAULT_EMPTY}</Text>
                    </View>
                  )}
              </ScrollView>

              { 1 === 2 && (
                <FlatList
                  contentContainerStyle={styles.container}
                  data={visible ? values : []}
                  keyExtractor={tx => `${tx.timestamp}-${tx.value}`}
                  onScroll={_onScroll}
                  scrollEventThrottle={40}
                  ListHeaderComponent={() => (
                    visible && (
                      <Fragment>
                        <Summary {...vault} image={FLAGS[currency]} title={`${title} ${l10n.BALANCE}`} />
                        <Search l10n={l10n} onValue={_onSearch} value={search} />
                      </Fragment>
                    )
                  )}
                  ListEmptyComponent={() => (
                    <View style={[styles.content, styles.container]}>
                      <Text level={2} lighten>{l10n.VAULT_EMPTY}</Text>
                    </View>
                  )}
                  renderItem={({ item }) => <GroupTransactions {...item} currency={currency} />}
                />
              )}

              <Footer
                onBack={navigation.goBack}
                onHardwareBack={() => _onHardwareBack(navigation)}
                onPress={_onTxType}
                options={vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER]}
                visible={visible}
              />

              { visible && (
                <Fragment>
                  <DialogTransaction
                    currency={currency}
                    highlight={settings[NIGHT_MODE]}
                    type={type}
                    vault={hash}
                    onClose={_onToggleDialog}
                    visible={dialog && type !== TRANSFER}
                  />
                  { vaults.length > 1 && (
                    <DialogTransfer
                      highlight={settings[NIGHT_MODE]}
                      onClose={_onToggleDialog}
                      vault={hash}
                      visible={dialog && type === TRANSFER}
                    />
                  )}
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
