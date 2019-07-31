import { shape, string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

import { FLAGS } from '../../../../assets';
import { C } from '../../../../common';
import { HorizontalChartItem } from '../../../../components';
import { THEME } from '../../../../reactor/common';
import { format } from '../../../../reactor/components/Price/modules';
import Heading from '../../../../components/Heading';
import styles from './Currencies.style';

const { COLOR } = THEME;
const { SYMBOL } = C;

class Currencies extends PureComponent {
  static propTypes = {
    baseCurrency: string.isRequired,
    dataSource: shape({}).isRequired,
    l10n: shape({}).isRequired,
  };

  render() {
    const { props: { baseCurrency, dataSource, l10n } } = this;

    return (
      <Fragment>
        <Heading title={l10n.CURRENCIES} />
        { Object.keys(dataSource).filter(currency => dataSource[currency].base > 0).map(currency => (
          <HorizontalChartItem
            color={COLOR[currency]}
            key={currency}
            currency={baseCurrency}
            image={FLAGS[currency]}
            style={styles.chart}
            title={format({ symbol: SYMBOL[currency], value: dataSource[currency].balance })}
            value={dataSource[currency].base}
            width={dataSource[currency].weight}
          />
        ))}
      </Fragment>
    );
  }
}

export default Currencies;
