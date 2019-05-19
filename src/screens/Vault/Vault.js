import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import { Summary, Footer, Header } from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';
import { DialogTransaction, GroupTransactions, Search } from './components';
import query from './modules/query';
import styles from './Vault.style';

const { SETTINGS: { NIGHT_MODE } } = C;
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
    values: [],
  };

  componentWillReceiveProps({ dataSource, visible, ...store }) {
    const { props: { dataSource: { txs = [] } = {} } } = this;

    if (visible && dataSource && dataSource.txs.length !== txs.length) {
      const search = undefined;
      this.setState({
        scrollQuery: false, search, values: query(store, { ...dataSource, search }), vault: dataSource,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props: { backward, visible },
      state: {
        dialog, scroll, search, scrollQuery,
      },
    } = this;

    return (nextProps.visible !== visible)
      || (nextState.backward !== backward)
      || (nextState.dialog !== dialog)
      || (nextState.scroll !== scroll)
      || (nextState.search !== search)
      || (nextState.scrollQuery !== scrollQuery);
  }

  _onHardwareBack = (navigation) => {
    const { state: { dialog } } = this;
    if (dialog) this.setState({ dialog: false });
    else {
      navigation.goBack();
      this.forceUpdate();
    }
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

  render() {
    const {
      _onHardwareBack, _onScroll, _onSearch, _onToggleDialog,
      props: { visible, ...inherit },
      state: {
        dialog, scroll, search, values = [], vault = {},
      },
    } = this;
    const { currency, hash, title } = vault;

    console.log('<Vault>', {
      visible, dialog, scroll, search,
    });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n, store: { settings } }) => (
            <Fragment>
              <Header highlight={scroll} image={FLAGS[currency]} title={title} />
              <ScrollView onScroll={_onScroll} scrollEventThrottle={40} style={styles.container}>
                <Fragment>
                  <Summary {...vault} image={FLAGS[currency]} title={`${title} ${l10n.BALANCE}`} />
                  <Search l10n={l10n} onValue={_onSearch} value={search} />
                </Fragment>
                { values.length > 0
                  ? (
                    <View>
                      { values.map(item => <GroupTransactions key={item.timestamp} {...item} currency={currency} />) }
                    </View>
                  )
                  : (
                    <View style={[styles.content, styles.container]}>
                      <Text level={2} lighten>{l10n.NO_TRANSACTIONS}</Text>
                    </View>
                  )}
              </ScrollView>

              <Footer
                onBack={navigation.goBack}
                onHardwareBack={visible ? () => _onHardwareBack(navigation) : undefined}
                onPress={_onToggleDialog}
              />

              { visible && (
                <DialogTransaction
                  currency={currency}
                  highlight={settings[NIGHT_MODE]}
                  onClose={_onToggleDialog}
                  vault={hash}
                  visible={dialog}
                />
              )}
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Vault;
