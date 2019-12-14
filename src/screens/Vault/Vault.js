import { bool, func, shape } from 'prop-types';
import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
import { ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import {
  Footer, GroupTransactions, Header, Summary,
} from '../../components';
import { Consumer, useNavigation } from '../../context';
import { LAYOUT, THEME } from '../../reactor/common';
import { Activity, Text, Viewport } from '../../reactor/components';
import { DialogTransaction, Search } from './components';
import query from './modules/query';
import styles from './Vault.style';

const { COLOR, SPACE } = THEME;

const Vault = (props) => {
  const {
    dataSource, goBack, visible, ...inherit
  } = props;
  const navigation = useNavigation();
  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [search, setSearch] = useState(undefined);
  const [values, setValues] = useState([]);
  const [vault, setVault] = useState(undefined);
  const scrollview = useRef(null);

  useEffect(() => {
    const { txs = [] } = dataSource || {};

    if (visible && txs.length > 0) {
      const nextValues = query(props, { ...dataSource, search: undefined });
      const totalTxs = Object.values(nextValues).length > 0
        ? Object.values(nextValues).map((value) => value.txs.length).reduce((a, b) => a += b)
        : 0;

      setScrollQuery(totalTxs !== 16);
      setSearch(undefined);
      setValues(nextValues);
      setVault(dataSource);
    } else if (!visible) scrollview.current.scrollTo({ y: 0, animated: false });
  }, [visible, dataSource, props]);

  const onHardwareBack = () => {
    if (dialog) setDialog(false);
    else navigation.goBack();
  };

  const onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const nextScroll = y > SPACE.MEDIUM;
    if (nextScroll !== scroll) setScroll(nextScroll);

    if (!scrollQuery && y > (LAYOUT.VIEWPORT.H / 2)) {
      const nextscrollQuery = true;
      setScrollQuery(nextscrollQuery);
      setValues(query(props, { ...dataSource, search }, nextscrollQuery));
    }
  };

  const onSearch = (value) => {
    setSearch(value);
    setValues(query(props, { ...dataSource, search: value.toLowerCase().trim() }, scrollQuery));
  };

  const { currency, hash, title } = vault || {};

  console.log('<Vault>', {
    visible, dialog, scroll, scrollQuery, search,
  });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Header highlight={scroll} image={FLAGS[currency]} title={title} />
            <ScrollView onScroll={onScroll} ref={scrollview} scrollEventThrottle={40} style={styles.container}>
              <Fragment>
                <Summary {...vault} image={FLAGS[currency]} title={`${title} ${l10n.BALANCE}`} />
                <Search l10n={l10n} onValue={onSearch} value={search} />
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
              onHardwareBack={visible ? onHardwareBack : undefined}
              onPress={() => setDialog(true)}
            />

            { visible && (
              <DialogTransaction
                currency={currency}
                onClose={() => setDialog(false)}
                vault={hash}
                visible={dialog}
              />
            )}
          </Fragment>
        )}
      </Consumer>
    </Viewport>
  );
};

Vault.propTypes = {
  backward: bool,
  dataSource: shape({}),
  goBack: func,
  visible: bool,
};

Vault.defaultProps = {
  backward: false,
  dataSource: undefined,
  goBack() {},
  visible: true,
};

export default Vault;
