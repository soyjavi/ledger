import { bool, func, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { BackHandler, View, ScrollView } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { ChartCategories } from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { ENV } from '../../reactor/common';
import { Price, Text, Viewport } from '../../reactor/components';
import styles from './Stats.style';

const { iconBack } = ASSETS;
const { FIXED, SYMBOL } = C;
const { IS_WEB } = ENV;

class Stats extends Component {
  static propTypes = {
    navigation: shape({}),
    goBack: func,
    visible: bool,
  };

  static defaultProps = {
    navigation: undefined,
    goBack() {},
    visible: true,
  };

  state = {
    date: undefined,
  };

  componentWillReceiveProps({ backward, goBack }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      const { props: { navigation } } = this;

      goBack(navigation);
      return true;
    });
  }

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
                left={IS_WEB ? { icon: iconBack, onPress: () => navigation.goBack(props.navigation) } : undefined}
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
                      { Object.keys(expenses).map(key => (
                        <ChartCategories
                          key={key}
                          category={key}
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
                      { Object.keys(incomes).map(key => (
                        <ChartCategories
                          key={key}
                          category={key}
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
