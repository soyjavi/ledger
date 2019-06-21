import { func, shape, string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

import { FLAGS } from '../../../../../assets';
import { setCurrency, translate } from '../../../../../common';
import { CardOption, PriceFriendly } from '../../../../../components';
import { Consumer } from '../../../../../context';
import { Form, Slider, Text } from '../../../../../reactor/components';
import { THEME } from '../../../../../reactor/common';
import { hydrate, queryAvailableVaults } from '../modules';

import styles, { CARD_WIDTH } from '../DialogTransaction.style';

const { COLOR, SPACE } = THEME;

class FormTransaction extends PureComponent {
  static propTypes = {
    destination: string,
    color: string.isRequired,
    form: shape({}).isRequired,
    onChange: func.isRequired,
    vault: string.isRequired,
  };

  static defaultProps = {
    destination: undefined,
  };

  _onChange = (values, { baseCurrency, vaults, rates }) => {
    const {
      destination, form, onChange, vault,
    } = this.props;
    const keys = Object.keys(rates);
    const lastRates = rates[keys[keys.length - 1]];
    const { value } = values;
    let { exchange } = values;

    const from = vaults.find(({ hash }) => hash === vault);
    const to = vaults.find(({ hash }) => hash === destination);

    if (destination && exchange === form.exchange) {
      if (from.currency === to.currency) exchange = value;
      else if (from.currency === baseCurrency) exchange = value * lastRates[to.currency];
      else if (to.currency === baseCurrency) exchange = value / lastRates[from.currency];
      else exchange = (value / lastRates[from.currency]) * lastRates[to.currency];
      exchange = parseFloat(exchange, 10).toFixed(2);
    }

    onChange({
      form: {
        exchange, from, to, value,
      },
      valid: to !== undefined
        && (value !== undefined && value.length > 0)
        && (exchange !== undefined && exchange.length > 0),
    });
  }

  _onVault = (destination) => {
    const { props: { onChange } } = this;
    onChange({ destination, form: {}, valid: false });
  }

  render() {
    const {
      _onChange, _onVault, _onValid,
      props: {
        color, destination, form, vault,
      },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Fragment>
            <Text subtitle level={3}>{l10n.VAULT_DESTINATION}</Text>
            <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.cards}>
              { queryAvailableVaults(store, vault).map(({
                currency, currentBalance, hash, title,
              }) => (
                <CardOption
                  key={hash}
                  color={color}
                  image={FLAGS[currency]}
                  onPress={() => _onVault(hash)}
                  selected={hash === destination}
                  style={styles.card}
                  title={title}
                >
                  <PriceFriendly
                    caption
                    color={hash === destination ? COLOR.WHITE : COLOR.TEXT_LIGHTEN}
                    level={3}
                    value={currentBalance}
                    currency={currency}
                  />
                </CardOption>
              ))}
            </Slider>
            <Form
              attributes={setCurrency(translate(hydrate(this, store), l10n))}
              color={color}
              onValid={_onValid}
              onChange={value => _onChange(value, store)}
              value={form}
            />
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default FormTransaction;
