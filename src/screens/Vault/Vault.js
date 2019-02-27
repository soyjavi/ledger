import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { BackHandler, FlatList, View } from 'react-native';

import ASSETS from '../../assets';
import { C, verboseMonth } from '../../common';
import {
  BalanceCard, DialogClone, DialogTransaction, DialogTransfer, FloatingButton, HeadingItem,
} from '../../components';
import { GroupTransactions, Header } from '../../containers';
import { Consumer } from '../../context';
import { ENV } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';
import styles from './Vault.style';

const { iconBack } = ASSETS;
const { TX: { TYPE: { EXPENSE, TRANSFER } } } = C;
const { IS_WEB } = ENV;
let TIMEOUT;

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
    clone: undefined,
    dialog: false,
    type: EXPENSE,
  };

  componentWillReceiveProps({ backward, goBack }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      const { props: { navigation }, state: { clone, dialog } } = this;

      if (clone || dialog) this.setState({ clone: false, dialog: false });
      else goBack(navigation);
      return true;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props: { visible },
      state: { clone, dialog },
    } = this;

    return (nextProps.visible !== visible) || (nextState.clone !== clone) || (nextState.dialog !== dialog);
  }

  _onSearch = ({ value, store: { query }, l10n }) => {
    const { navigation: { state: { params: { hash: vault } } } } = this.props;

    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => {
      query({
        l10n, method: 'groupByDay', search: value.toLowerCase().trim(), vault,
      });
    }, 300);
  }

  _onToggleClone = clone => this.setState({ clone });

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onTransactionType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onSearch, _onToggleClone, _onToggleDialog, _onTransactionType,
      props: { visible, ...props },
      state: { clone, dialog, type },
    } = this;
    const { state: { params: vault = {} } = {} } = props.navigation;
    const { currency, hash } = vault;

    console.log('<Vault>');

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: { queryTxs, vaults, ...store },
          }) => (
            <Fragment>
              <Header
                left={IS_WEB ? { icon: iconBack, onPress: () => navigation.goBack(props.navigation) } : undefined}
                onSearch={visible
                  ? value => _onSearch({ value, store, l10n })
                  : undefined}
                visible={visible}
              />

              <FlatList
                contentContainerStyle={styles.container}
                data={visible ? queryTxs : []}
                keyExtractor={tx => `${tx.timestamp}-${tx.value}`}
                ListHeaderComponent={() => (
                  <BalanceCard {...vaults.find(v => v.hash === hash)} title={`${vault.title} ${l10n.BALANCE}`} />
                )}
                ListEmptyComponent={() => (
                  <View style={[styles.content, styles.container]}>
                    <Text level={2} lighten>{l10n.VAULT_EMPTY}</Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  item.heading
                    ? <HeadingItem lighten title={verboseMonth(item.timestamp, l10n)} />
                    : <GroupTransactions {...item} currency={currency} onItem={tx => _onToggleClone(tx)} />
                )}
              />

              <FloatingButton
                onPress={dialog ? _onToggleDialog : _onTransactionType}
                options={vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER]}
                visible={!dialog && !props.backward}
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
                  <DialogClone
                    currency={currency}
                    dataSource={clone}
                    visible={!!clone}
                    onClose={() => _onToggleClone()}
                  />
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
