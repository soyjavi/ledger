import { bool } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View, ScrollView } from 'react-native';

import { iconBack } from '../../assets';
import { C } from '../../common';
import { BulletPrice, ChartCategories } from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Stats.style';

const { COLORS } = C;

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

  _onChangeMonth = (date, store) => { // @TODO
    store.query({ method: 'groupByCategory', date });
    this.setState({ date });
  }

  render() {
    const { props: { visible, ...inherit } } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation, l10n,
            store: { baseCurrency, queryTxs: { cashflow = {}, expenses = {}, incomes = {} } = {} },
          }) => (
            <Fragment>
              <Header
                left={{ icon: iconBack, onPress: () => navigation.goBack() }}
                title={l10n.STATS}
                visible={visible}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                { Object.keys(expenses).length > 0 && (
                  <View style={styles.content}>
                    <View style={styles.row}>
                      <Text headline level={6} style={styles.title}>{l10n.EXPENSES}</Text>
                      <BulletPrice expenses currency={baseCurrency} value={cashflow.expenses} />
                    </View>
                    <View>
                      { Object.keys(expenses).map(key => (
                        <ChartCategories
                          key={key}
                          category={key}
                          color={COLORS[key]}
                          currency={baseCurrency}
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
                      <BulletPrice incomes currency={baseCurrency} value={cashflow.incomes} />
                    </View>
                    <View>
                      { Object.keys(incomes).map(key => (
                        <ChartCategories
                          key={key}
                          category={key}
                          color={COLORS[(COLORS.length - 1) - key]}
                          currency={baseCurrency}
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
