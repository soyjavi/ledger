import { func, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { FLAGS } from '../../../../../assets';
import { currencyDecimals, setCurrency, translate } from '../../../../../common';
import { CardOption, PriceFriendly } from '../../../../../components';
import { useL10N, useStore } from '../../../../../context';
import { Form, Slider, Text } from '../../../../../reactor/components';
import { THEME } from '../../../../../reactor/common';
import { hydrate, queryAvailableVaults } from '../modules';

import styles, { CARD_WIDTH } from '../DialogTransaction.style';

const { COLOR, SPACE } = THEME;

const FormTransaction = (props) => {
  const {
    color, destination, form, onChange, vault,
  } = props;
  const l10n = useL10N();
  const store = useStore();
  const { baseCurrency, vaults, rates } = store;

  const handleChange = (values) => {
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

      exchange = parseFloat(exchange, 10).toFixed(currencyDecimals(exchange, to.currency));
    }

    onChange({
      form: {
        exchange, from, to, value,
      },
      valid: to !== undefined
        && (value !== undefined && value.length > 0)
        && (exchange !== undefined && exchange.length > 0),
    });
  };

  return (
    <Fragment>
      <Text subtitle>{l10n.VAULT_DESTINATION}</Text>
      <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.cards}>
        { queryAvailableVaults(store, vault).map(({
          currency, currentBalance, hash, title,
        }) => (
          <CardOption
            key={hash}
            color={color}
            image={FLAGS[currency]}
            onPress={() => onChange({ destination: hash, form: {}, valid: false })}
            selected={hash === destination}
            style={styles.card}
            title={title}
          >
            <PriceFriendly
              caption
              color={hash === destination ? COLOR.WHITE : COLOR.TEXT_LIGHTEN}
              value={currentBalance}
              currency={currency}
            />
          </CardOption>
        ))}
      </Slider>
      <Form
        attributes={setCurrency(translate(hydrate(props, vaults), l10n))}
        color={color}
        onChange={handleChange}
        value={form}
      />
    </Fragment>
  );
};

FormTransaction.propTypes = {
  destination: string,
  color: string.isRequired,
  form: shape({}).isRequired,
  onChange: func.isRequired,
  vault: string.isRequired,
};

FormTransaction.defaultProps = {
  destination: undefined,
};

export default FormTransaction;
