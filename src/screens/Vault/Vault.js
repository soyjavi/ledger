import { bool, func, shape } from 'prop-types';
import React, { createRef, Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import {
  Footer, GroupTransactions, Header, Summary,
} from '../../components';
import { Consumer } from '../../context';
import { LAYOUT, THEME } from '../../reactor/common';
import { Activity, Text, Viewport } from '../../reactor/components';
import { DialogTransaction, Search } from './components';
import query from './modules/query';
import styles from './Vault.style';

const { COLOR, SPACE } = THEME;

class Vault extends PureComponent {
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

  constructor(props) {
    super(props);
    this.scrollview = createRef();
    this.state = {
      dialog: false,
      scroll: false,
      scrollQuery: false,
      search: undefined,
      values: [],
    };
  }

  componentWillReceiveProps({ dataSource, visible, ...store }) {
    const { props: { dataSource: { txs = [] } = {}, ...props } } = this;

    if (visible && dataSource && (dataSource.txs.length === 0 || dataSource.txs.length !== txs.length)) {
      const search = undefined;
      const values = query(store, { ...dataSource, search });
      const totalTxs = Object.values(values).length > 0
        ? Object.values(values).map((value) => value.txs.length).reduce((a, b) => a += b)
        : 0;

      this.setState({
        scrollQuery: totalTxs !== 16, search, values, vault: dataSource,
      });
    } else if (visible !== props.visible) this.scrollview.current.scrollTo({ y: 0, animated: false });
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

    if (!state.scrollQuery && y > (LAYOUT.VIEWPORT.H / 2)) {
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
        dialog, scroll, scrollQuery, search, values = [], vault = {},
      },
    } = this;
    const { currency, hash, title } = vault;

    console.log('<Vault>', {
      visible, dialog, scroll, scrollQuery, search,
    });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n }) => (
            <Fragment>
              <Header highlight={scroll} image={FLAGS[currency]} title={title} />
              <ScrollView onScroll={_onScroll} ref={this.scrollview} scrollEventThrottle={40} style={styles.container}>
                <Fragment>
                  <Summary {...vault} image={FLAGS[currency]} title={`${title} ${l10n.BALANCE}`} />
                  <Search l10n={l10n} onValue={_onSearch} value={search} />
                </Fragment>
                { values.length > 0
                  ? (
                    <Fragment>
                      <Fragment>
                        { values.map((item) => (
                          <GroupTransactions key={`${item.timestamp}-${search}`} {...item} currency={currency} />))}
                      </Fragment>
                      { !search && !scrollQuery && (
                        <Activity size="large" color={COLOR.BASE} style={styles.activity} />)}
                    </Fragment>
                  )
                  : (
                    <View style={[styles.content, styles.container]}>
                      <Text lighten>{l10n.NO_TRANSACTIONS}</Text>
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
