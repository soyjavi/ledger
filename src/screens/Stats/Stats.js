import { arrayOf, bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import { Chart, Header, HeadingItem } from '../../components';
import { Consumer } from '../../context';
import { ENV, THEME } from '../../reactor/common';
import { Activity, Text, Viewport } from '../../reactor/components';
import { ItemGroupCategories } from './components';
import query from './modules/query';
import styles from './Stats.style';

const { iconBack } = ASSETS;
const { COLOR } = THEME;
const { IS_WEB } = ENV;

class Stats extends PureComponent {
  static propTypes = {
    backward: bool,
    txs: arrayOf(shape({})),
    navigation: shape({}),
    vaults: arrayOf(shape({})),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    txs: undefined,
    navigation: undefined,
    vaults: undefined,
    visible: true,
  };

  state = {
    values: undefined,
  };

  componentWillReceiveProps({
    backward, visible, ...inherit
  }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    if (visible) {
      this.setState({ values: undefined });
      this.setState({ values: query(inherit, { month: true }) });
    }

    BackHandler[method]('hardwareBackPress', () => {
      return true;
    });
  }

  render() {
    const { props: { visible, ...inherit }, state: { values } } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation, store: { overall } }) => (
              <Fragment>
                <Header
                  left={IS_WEB ? { icon: iconBack, onPress: () => navigation.goBack() } : undefined}
                  title={l10n.STATS}
                  visible={visible}
                />
                <ScrollView contentContainerStyle={styles.container}>
                  <HeadingItem title="$This Year" />
                  <View style={styles.content}>
                    <View style={[styles.card, styles.cardLarge]}>
                      <Text caption level={2} numberOfLines={1}>$CAPTION CONTEXT</Text>
                      <Chart captions={l10n.MONTHS} values={overall.chart.balance} />
                    </View>

                    <View style={[styles.card, styles.cardSmall, styles.cardGap]}>
                      <Text caption level={2} numberOfLines={1}>{l10n.EXPENSES.toUpperCase()}</Text>
                      <Chart series={overall.chart.expenses} color={COLOR.EXPENSES} />
                    </View>

                    <View style={[styles.card, styles.cardSmall]}>
                      <Text caption level={2} numberOfLines={1}>{l10n.INCOMES.toUpperCase()}</Text>
                      <Chart series={overall.chart.incomes} color={COLOR.INCOMES} />
                    </View>
                  </View>

                  { !values && <Activity /> }

                  { values && values[0] && <ItemGroupCategories type={0} dataSource={values[0]} /> }
                  { values && values[1] && <ItemGroupCategories type={1} dataSource={values[1]} /> }
                </ScrollView>
              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Stats;
