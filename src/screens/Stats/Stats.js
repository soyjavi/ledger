import { bool, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View, ScrollView } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { ChartCategories } from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Price, Text, Viewport } from '../../reactor/components';
import styles from './Stats.style';

const { iconBack } = ASSETS;
const { COLORS, FIXED, SYMBOL } = C;

class Stats extends Component {
  static propTypes = {
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    navigation: undefined,
    visible: true,
  };

  state = {
    date: undefined,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { visible }, state: { date } } = this;
    return (visible !== nextProps.visible) || (date !== nextState.date);
  }

  _onChangeMonth = (date, store) => { // @TODO
    store.query({ method: 'groupByCategory', date });
    this.setState({ date });
  }

  render() {
    const { props: { visible, ...props } } = this;

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: {
              baseCurrency,
              queryTxs: {
                cashflow = {}, expenses = {}, group = {}, incomes = {},
              } = {},
            },
          }) => (
            <Fragment>
              <Header
                left={{ icon: iconBack, onPress: () => navigation.goBack(props.navigation) }}
                title={l10n.STATS}
                visible={visible}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                { Object.keys(expenses).length > 0 && (
                  <View style={styles.content}>
                    <View style={styles.row}>
                      <Text subtitle style={styles.title}>{l10n.EXPENSES}</Text>
                      <Price
                        fixed={FIXED[baseCurrency]}
                        headline
                        level={6}
                        symbol={SYMBOL[baseCurrency]}
                        value={cashflow.expenses}
                      />
                    </View>
                    <View style={styles.values}>
                      { Object.keys(expenses).map((key, index) => (
                        <ChartCategories
                          key={key}
                          category={key}
                          color={COLORS[index]}
                          currency={baseCurrency}
                          group={group.expenses}
                          l10n={l10n.CATEGORIES[0]}
                          total={cashflow.expenses}
                          value={expenses[key]}
                        />))}
                    </View>
                  </View>)}

                { Object.keys(incomes).length > 0 && (
                  <View style={styles.content}>
                    <View style={styles.row}>
                      <Text headline level={6} style={styles.title}>{l10n.INCOMES}</Text>
                      <Price
                        fixed={FIXED[baseCurrency]}
                        headline
                        level={6}
                        title="+"
                        symbol={SYMBOL[baseCurrency]}
                        value={cashflow.incomes}
                      />
                    </View>
                    <View style={styles.values}>
                      { Object.keys(incomes).map((key, index) => (
                        <ChartCategories
                          key={key}
                          category={key}
                          color={COLORS[(COLORS.length - 1) - index]}
                          currency={baseCurrency}
                          group={group.incomes}
                          l10n={l10n.CATEGORIES[1]}
                          total={cashflow.incomes}
                          value={incomes[key]}
                        />))}
                    </View>
                  </View>)}
              </ScrollView>
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Stats;
