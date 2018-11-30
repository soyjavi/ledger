import { bool } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View, ScrollView } from 'react-native';

import { iconBack } from '../../assets';
import { BulletPrice, ChartCategories, SliderMonths } from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Stats.style';

class Stats extends Component {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    date: undefined,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { visible }, state: { date } } = this;
    return (visible !== nextProps.visible) || (date !== nextState.date);
  }

  _onChangeMonth = (date, store) => {
    store.query({ method: 'groupByCategory', date });
    this.setState({ date });
  }

  render() {
    const {
      _onChangeMonth,
      props: { visible, ...inherit },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: {
              baseCurrency, overall, queryTxs, vaults, ...store
            },
          }) => (
            <Fragment>
              <Header
                left={{ icon: iconBack, onPress: () => navigation.goBack() }}
                title={l10n.STATS}
                visible={visible}
              />
              <SliderMonths
                dataSource={overall.months}
                onChange={visible ? month => _onChangeMonth(month, store) : undefined}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                  { vaults.map(({ color, hash, title }) => (
                    queryTxs[hash]
                      ? (
                        <View key={hash} style={styles.content}>
                          <Text headline level={6}>{title}</Text>
                          { Object.keys(queryTxs[hash].incomes).length > 0 && (
                            <View>
                              <View style={styles.row}>
                                <Text subtitle level={2} lighten style={styles.subtitle}>{l10n.INCOMES}</Text>
                                { Object.keys(queryTxs[hash].incomes).length > 1 && (
                                  <BulletPrice
                                    incomes
                                    currency={baseCurrency}
                                    value={Object.values(queryTxs[hash].incomes).reduce((a, b) => a + b, 0)}
                                  />)}
                              </View>
                              <ChartCategories
                                categories={l10n.CATEGORIES[1]}
                                color={color}
                                currency={baseCurrency}
                                total={queryTxs.cashflow.incomes}
                                values={queryTxs[hash].incomes}
                              />
                            </View>)}

                          { Object.keys(queryTxs[hash].expenses).length > 0 && (
                            <View>
                              <View style={styles.row}>
                                <Text subtitle level={2} lighten style={styles.subtitle}>{l10n.EXPENSES}</Text>
                                { Object.keys(queryTxs[hash].expenses).length > 1 && (
                                  <BulletPrice
                                    currency={baseCurrency}
                                    value={Object.values(queryTxs[hash].expenses).reduce((a, b) => a + b, 0)}
                                  />)}
                              </View>
                              <ChartCategories
                                categories={l10n.CATEGORIES[0]}
                                color={color}
                                currency={baseCurrency}
                                total={queryTxs.cashflow.expenses}
                                values={queryTxs[hash].expenses}
                              />
                            </View>)}
                        </View>)
                      : <View key={hash} />))}
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Stats;
